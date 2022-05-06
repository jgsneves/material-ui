import axios from 'axios';

interface AuthenticateUserArgs {
  email: string;
  password: string;
}

interface CreateNewUserArgs {
  name: string;
  email: string;
  mobile_phone: string;
  token: string;
}

interface AuthenticateUserResponse {
  token: string;
}

interface GetUsersListResponse {
  result: User[];
}

interface CreateNewUserResponse {
  result: User;
}

class ApiService {
  private apiBaseURL = process.env.REACT_APP_API_URL;

  private authHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  private formHeader = {
    'Content-Type': 'multipart/form-data',
  };

  authenticateUser({ email, password }: AuthenticateUserArgs) {
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

  getUsersList(token: string) {
    const headers = {
      ...this.authHeader,
      Authorization: `Bearer ${token}`,
    };
    return axios.get<GetUsersListResponse>(`${this.apiBaseURL}/user/list`, {
      headers,
    });
  }

  createNewUser({ email, mobile_phone, name, token }: CreateNewUserArgs) {
    const headers = {
      ...this.formHeader,
      Authorization: `Bearer ${token}`,
    };
    return axios.post<CreateNewUserResponse>(
      `${this.apiBaseURL}/user/create`,
      {
        name,
        email,
        mobile_phone,
      },
      {
        headers,
      },
    );
  }
}

const service = new ApiService();

export default service;
