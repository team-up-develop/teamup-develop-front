import dayjs from "dayjs";
import "dayjs/locale/ja";
// import isBetween from 'dayjs/plugin/isBetween'

dayjs.locale("ja");

const dayJsFormat = (value: string, format: string) => {
  return dayjs(value).format(format);
};

export { dayjs, dayJsFormat };
// dayjs.extend(isBetween)

// export default dayjs
