import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

const dayJsFormat = (value: string, format: string) => {
  return dayjs(value).format(format);
};

export { dayJsFormat };
