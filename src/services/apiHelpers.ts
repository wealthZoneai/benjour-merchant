import { convertEmail } from "../global/helpers";
import endpoints from "./endpoints";
import server from './index'


export function loginUser({email, password}: ILoginUserBody) {
  const body = {email, password};
  return server.post(endpoints.login, body, { requiresAuth: false });
}

export function AllCategory() {
  return server.get(endpoints.AllCategory ,{ requiresAuth: true });
}

export async function AddCategory({ merchantId, name, description, image }: AddCategoryBody) {
  const id = `${merchantId}/addMenu`;

  const formData = new FormData();
  formData.append("merchantId", merchantId);
  formData.append("name", name);

  if (description) {
    formData.append("description", description);
  }

  formData.append("image", image);

  return server.post(endpoints.AddCategory + id, formData, { requiresAuth: true });
}





