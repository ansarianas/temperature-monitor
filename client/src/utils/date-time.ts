import { formatDistanceToNow } from "date-fns";

export const formatRelativeTime = (date: string) => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (error) {
    console.log(error);
  }
};
