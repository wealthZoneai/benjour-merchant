import { convertEmail } from "../global/helpers";
import endpoints from "./endpoints";
import server from './index'


export function loginUser({email, password}: ILoginUserBody) {
  const body = {identity: convertEmail(email), password};
  return server.post(endpoints.login, body, { requiresAuth: false });
}