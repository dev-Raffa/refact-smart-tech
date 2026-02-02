import { format } from "date-fns";

export const getCurrentDate = () => {
  return format(new Date(), "dd-MM-yyyy - HH:mm");
}