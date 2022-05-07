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

interface UserUpdateArgs {
  name?: string;
  email?: string;
  mobile_phone?: string;
  user_id: number;
  token: string;
}

interface SavePhotoArgs {
  file: File;
  user_id: number;
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

interface GetUserResponse {
  result: User;
}

interface UserUpdateResponse {
  result: boolean;
}

interface SavePhotoResponse {
  photo: string;
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

  userUpdate({ user_id, email, mobile_phone, name, token }: UserUpdateArgs) {
    const headers = {
      ...this.formHeader,
      Authorization: `Bearer ${token}`,
    };
    return axios.post<UserUpdateResponse>(
      `${this.apiBaseURL}/user/update`,
      {
        user_id,
        name,
        email,
        mobile_phone,
      },
      {
        headers,
      },
    );
  }

  getUser(id: string, token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get<GetUserResponse>(`${this.apiBaseURL}/user/view/${id}`, {
      headers,
    });
  }

  savePhoto({ file, token, user_id }: SavePhotoArgs) {
    const headers = {
      ...this.formHeader,
      Authorization: `Bearer ${token}`,
    };
    return axios.post<SavePhotoResponse>(
      `${this.apiBaseURL}/photo/save`,
      { file, user_id },
      { headers },
    );
  }

  updatePhoto({ file, token, user_id }: SavePhotoArgs) {
    const headers = {
      ...this.formHeader,
      Authorization: `Bearer ${token}`,
    };
    return axios.post<SavePhotoResponse>(
      `${this.apiBaseURL}/photo/update`,
      { file, user_id },
      { headers },
    );
  }
}

const service = new ApiService();

export default service;
