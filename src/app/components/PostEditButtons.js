import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineRollback, AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { deletePost } from "../features/postsSlice";

export const PostEditButtons = ({ onClickBack, post, onClickEdit }) => {
  const dispatch = useDispatch();
  const onClickDelete = (item) => {
    dispatch(deletePost({ postId: item.id, imageUrl: item.image }));
  };
  return (
    <div
      className="buttonsBlock"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <div className="postButton buttonBack" onClick={onClickBack}>
        <AiOutlineRollback /> Назад
      </div>
      <div className="postButton buttonEdit" onClick={() => onClickEdit()}>
        <AiFillEdit />
        Редагувати
      </div>
      <div
        className="postButton buttonDelete"
        onClick={() => onClickDelete(post)}
      >
        <AiOutlineDelete /> Видалити
      </div>
    </div>
  );
};
