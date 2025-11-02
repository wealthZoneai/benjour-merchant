import { convertEmail } from "../global/helpers";
import endpoints from "./endpoints";
import server from './index'


// ... auth services
export function loginUser({email, password}: ILoginUserBody) {
  const body = {email, password};
  return server.post(endpoints.login, body, { requiresAuth: false });
}
export function RegisterUser({username, email, password}: RegisterUserBody) {
  const body = {username, email, password};
  return server.post(endpoints.register, body, { requiresAuth: false });
}
export function UserOtp({email, otp,role}: UserOtpBody) {
  const body = {email, otp,role};
  return server.post(endpoints.verifyUseremail, body, { requiresAuth: false });
}


// ... category services

export function AllCategory() {
  return server.get(endpoints.AllCategory ,{ requiresAuth: true });
}
export function AllCategoryItems(id?: any) {
   return server.get(`${endpoints.AllCategoryItems}${id}`, { requiresAuth: true });
}
export function DeleteCategoryItems(id?: any) {
   return server.delete(`${endpoints.deleteCategoryItem}/${id}`, { requiresAuth: true });
}
export function SearchCategoryItems(name?: any) {
  return server.get(`${endpoints.searchCategoryItem}${name}`, { requiresAuth: true });
}

export function DeleteCategory(id?: any) {
  const data = `${id}/deleteMenu`;
   return server.delete(`${endpoints.deleteCategory}/${data}`, { requiresAuth: true });
}
export async function AddCategory({ merchantId, name, image }: AddCategoryBody) {
  const id = `${merchantId}/addMenu`;

  const formData = new FormData();
  formData.append("merchantId", Number(merchantId).toString());
  formData.append("name", name);
  formData.append("image", image);

  return server.post(`${endpoints.AddCategory}/${id}`, formData, { requiresAuth: true });
}
export async function UpdateCategory({ merchantId, name, image }: AddCategoryBody) {
  const id = `${merchantId}/updateMenu`;

  const formData = new FormData();
  formData.append("merchantId", Number(merchantId).toString());
  formData.append("name", name);
  formData.append("image", image);

  return server.post(`${endpoints.AddCategory}/${id}`, formData, { requiresAuth: true });
}

export async function AddCategoryItem({
  merchantId,
  itemName,
  itemDescription,
  price,
  available,
  itemType,
  preparationTime,
  discount,
  ingredients,
  imageFile,
}:AddCategoryItemBody) {
  const id = `${merchantId}/add`;
  const formData = new FormData();
  formData.append("merchantId", merchantId.toString());
  formData.append("itemName", itemName);
  formData.append("itemDescription", itemDescription);
  formData.append("price", price.toString());
  formData.append("available", available.toString());
  formData.append("itemType", itemType);
  formData.append("preparationTime", preparationTime.toString());
  formData.append("discount", discount.toString());
  formData.append("ingredients", ingredients);
  formData.append("imageFile", imageFile);

  return server.post(`${endpoints.AddCategoryItem}/${id}`, formData, { requiresAuth: true });
}
export async function UpdateCategoryItem({
  Id,
  itemName,
  itemDescription,
  price,
  available,
  itemType,
  preparationTime,
  discount,
  ingredients,
  imageFile,
  itemId,
}:UpdateCategoryItemBody) {
  const formData = new FormData();
  formData.append("itemName", itemName);
  formData.append("itemId", itemId.toString());
  formData.append("itemDescription", itemDescription);
  formData.append("price", price.toString());
  formData.append("available", available.toString());
  formData.append("itemType", itemType);
  formData.append("preparationTime", preparationTime.toString());
  formData.append("discount", discount.toString());
  formData.append("ingredients", ingredients);
  formData.append("imageFile", imageFile);

  return server.put(`${endpoints.UpdateCategoryItem}/${Id}`, formData, { requiresAuth: true });
}


// ... orders services
export function GetAllOrders(merchantId?: number) {
  return server.get(`${endpoints.GetAllOrders}/${merchantId}`, { requiresAuth: true });
}
export function GetByOrderStatus(statusName?: string) {
  return server.get(`${endpoints.GetByOrderStatus}${statusName}`, { requiresAuth: true });
}

export function GetSearchByOrders(id: any, name: any) {
  const query = `${id}&searchText=${name}`;
  return server.get(`${endpoints.GetSearchByOrder}${query}`, { requiresAuth: true });
}




