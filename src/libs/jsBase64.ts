import { Base64 } from "js-base64";
const TEAME_UP_DECODE = "teamUpDecode";

const encode = (jobId: string) => {
  const str = jobId + TEAME_UP_DECODE;
  return Base64.encode(str);
};

const decode = (id: string) => {
  const str = Base64.decode(id);
  const replaceValue = str.replace(TEAME_UP_DECODE, "");
  return Number(replaceValue);
};

export { encode, decode };
