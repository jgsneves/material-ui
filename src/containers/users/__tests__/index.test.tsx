import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersContainer from '..';
import MockedAuthProvider from '../../../mocks/mockedAuthProvider';

describe('Users test suite', () => {
  it('Authorized user should see users list', async () => {
    const { asFragment, getByText } = render(
      <BrowserRouter>
        <MockedAuthProvider hash="goodHash">
          <UsersContainer />
        </MockedAuthProvider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      const userName = getByText('Jose da Silva');
      expect(asFragment()).toMatchSnapshot();
      expect(userName).toBeInTheDocument();
    });
  });
  it('Not authorized user should not see users list', async () => {
    const { asFragment, getByText } = render(
      <BrowserRouter>
        <MockedAuthProvider hash="">
          <UsersContainer />
        </MockedAuthProvider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      const errorMessage = getByText('Request failed with status code 403');
      const noUserMessage = getByText('Nenhum usuário encontrado!');
      expect(asFragment()).toMatchSnapshot();
      expect(errorMessage).toBeInTheDocument();
      expect(noUserMessage).toBeInTheDocument();
    });
  });
});
