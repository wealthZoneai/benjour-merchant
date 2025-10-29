

interface ILoginUserBody {
  email: string;
  password: string;
}

 interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }

interface AddCategoryBody {
  merchantId: string;
  name: string;
  description?: string;
  image: File;
}
