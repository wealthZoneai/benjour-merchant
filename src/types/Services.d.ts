

interface ILoginUserBody {
  email: string;
  password: string;
}

 interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }