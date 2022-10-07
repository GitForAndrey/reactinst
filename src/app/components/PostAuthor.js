import React from "react";

export const PostAuthor = ({ id, users }) => {
  const authorPost = users.find((e) => {
    return e.id === id;
  });

  return (
    <div className="author">
      Автор: {authorPost ? authorPost.userName : "невідомий автор"}
    </div>
  );
};
