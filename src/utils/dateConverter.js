import { parseISO } from "date-fns";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ru from "date-fns/locale/ru";

export function convertDate(date) {
  const parseDate = parseISO(date);
  const time = format(parseDate, "kk:mm", { locale: ru });
  const timeZone = `i-${format(parseDate, "z")}`;
  const dayDistance = `${formatDistanceToNow(parseDate, { locale: ru })} назад`;

  return `${dayDistance}, ${time} ${timeZone}`;
}
