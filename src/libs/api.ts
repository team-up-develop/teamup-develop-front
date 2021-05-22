import { $post } from "@/libs/axios";
import { AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";

const vuex = localStorage.getItem("vuex");
let token: string;
if (vuex) {
  const parseValue: any = JSON.parse(vuex);
  token = parseValue.auth.token;
}

type Response = {
  config: any;
  data: {
    status: string;
    msg: string;
    response: any;
  };
  headers: {};
  request: {};
  status: number;
  statusText: string;
};

const post = async (url: string, params: {}): Promise<Response | undefined> => {
  try {
    const res: Response = await $post(`${AUTH_URL}${url}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    catchError(error);
  }
};

export { post };
