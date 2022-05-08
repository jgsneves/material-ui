import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '..';
import MockedAuthProvider from '../../../mocks/mockedAuthProvider';

describe('Content Container test suite', () => {
  it('should render proper snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <MockedAuthProvider hash="">
          <Login />
        </MockedAuthProvider>
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('bad user should not be allowed to access the app', async () => {
    const { getByRole, getByLabelText, getByText } = render(
      <BrowserRouter>
        <MockedAuthProvider hash="">
          <Login />
        </MockedAuthProvider>
      </BrowserRouter>,
    );
    const emailInput = getByRole('textbox', {
      name: /email/i,
    });
    const passwordInput = getByLabelText(/senha/i);
    const submitButton = getByRole('button', {
      name: /entrar/i,
    });

    fireEvent.change(emailInput, { target: { value: 'bla' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText(
        'Houve algum erro. Mensagem: Request failed with status code 403',
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('good user should be allowed to access the app', async () => {
    const { getByRole, getByLabelText, queryAllByText } = render(
      <BrowserRouter>
        <MockedAuthProvider hash="">
          <Login />
        </MockedAuthProvider>
      </BrowserRouter>,
    );
    const emailInput = getByRole('textbox', {
      name: /email/i,
    });
    const passwordInput = getByLabelText(/senha/i);
    const submitButton = getByRole('button', {
      name: /entrar/i,
    });

    fireEvent.change(emailInput, { target: { value: 'teste@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = queryAllByText(
        'Houve algum erro. Mensagem: Request failed with status code 403',
      );
      expect(errorMessage).toEqual([]);
    });
  });
});
