import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { uk } from "date-fns/locale";

export const PostTime = ({ date }) => {
  const parseDate = parseISO(date);
  const result = formatDistanceToNow(parseDate, {
    locale: uk,
  });

  return <div className="postTime">Створено {result} тому</div>;
};
