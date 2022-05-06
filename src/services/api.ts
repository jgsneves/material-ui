import axios from 'axios';

interface AuthenticateUserArgs {
  email: string;
  password: string;
}

interface AuthenticateUserResponse {
  token: string;
}

class ApiService {
  private apiBaseURL = process.env.REACT_APP_API_URL;

  private authHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  async authenticateUser({ email, password }: AuthenticateUserArgs) {
    return axios.post<AuthenticateUserResponse>(
      `${this.apiBaseURL}/token`,
      {
        email,
        password,
      },
      {
        headers: this.authHeader,
      },
    );
  }
}

const service = new ApiService();

export default service;
