import { rest } from 'msw';

const apiBaseURL = process.env.REACT_APP_API_URL;

const mockedAuthenticateUser = rest.post(
  `${apiBaseURL}/token`,
  (req, res, ctx) => {
    const { body } = req;

    const mockedBodyData = {
      email: 'teste@gmail.com',
      password: '12345',
    };

    if (JSON.stringify(body) === JSON.stringify(mockedBodyData)) {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'hash',
        }),
      );
    }

    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not authorized',
      }),
    );
  },
);

const mockedGetUsersList = rest.get(
  `${apiBaseURL}/user/list`,
  (req, res, ctx) => {
    const { headers } = req;

    const authHeader = headers.get('authorization');

    const mockedUser: User = {
      created_at: '08/05/2022',
      email: 'teste@gmail.com',
      email_verified_at: null,
      id: 1,
      mobile_phone: '7199447543',
      name: 'Jose da Silva',
      parent_id: 1,
      updated_at: '08/05/2022',
    };

    if (authHeader === 'Bearer goodHash') {
      return res(
        ctx.status(200),
        ctx.json({
          result: [mockedUser],
        }),
      );
    }

    return res(
      ctx.status(403),
      ctx.json({
        result: 'Não autorizado.',
      }),
    );
  },
);

const handlers = [mockedAuthenticateUser, mockedGetUsersList];

export default handlers;
