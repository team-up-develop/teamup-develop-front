import router from "@/router";
import { m } from "@/master";

// TODO: catch error の際のモーダルを作成し、移行する
const catchError = (error: any) => {
  const { status, statusText } = error.response;
  console.log(status, "status");
  if (status == "401") {
    localStorage.clear();
    location.reload();
    return router.push({ name: "Unauthorized" });
  }
  return console.log(
    `エラーが発生しました。お問合せください。\n HTTP Status: ${status} ${statusText} \n メッセージ: ${error.response.data.message}`
  );
};

const fetchError = (status: string) => {
  if (status === m.STATUS_BADREQUEST_ERR) {
    router.push({ name: "BadRequest" });
  } else if (status === m.STATUS_NOTFOUND_ERR) {
    // request api or client url error
    router.push({ name: "NotFound" });
  } else if (status === m.STATUS_SERVER_ERR) {
    router.push({ name: "ServerError" });
  } else if (status === m.STATUS_UNAUTHORIZED) {
    router.push({ name: "Unauthorized" });
  }
  return;
};

export { fetchError, catchError };
