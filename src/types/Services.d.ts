

interface ILoginUserBody {
  email: string;
  password: string;
}
interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
}
interface UserOtpBody {
  role: string;
  email: string;
  otp: string;
}

 interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }

interface AddCategoryBody {
  merchantId: Number | string;
  name: string;
  image: File;
}
interface UpdateCategoryBody {
  id: Number | string;
  name: string;
  image: File;
  description?: string;
}
interface AddCategoryItemBody {
  merchantId: string;
  itemName: string;
  itemDescription: string;
  price: number;
  available: boolean;
  itemType: string;
  preparationTime: number;
  discount: number;
  itemId: number;
  ingredients: string;
  imageFile: File;
}
interface UpdateCategoryItemBody {
  Id: string;
  itemName: string;
  itemDescription: string;
  price: number;
  available: boolean;
  menuId: number;
  ingredients: string;
  imageUrl: File;
}
