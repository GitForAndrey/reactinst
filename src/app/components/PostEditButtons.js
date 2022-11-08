import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineRollback, AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { deletePost } from "../features/postsSlice";
import { useNavigate } from "react-router-dom";

export const PostEditButtons = ({ post, activeUser, onClickEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickDelete = (item) => {
    dispatch(deletePost({ postId: item.id, imageUrl: item.image }));
    navigate(`/`);
  };
  const onClickBack = () => {
    navigate(-1);
  };
  return activeUser === post.authorId ? (
    <div
      className="buttonsBlock"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <div className="postButton buttonBack" onClick={() => onClickBack()}>
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
  ) : (
    <div className="buttonsBlock" style={{ display: "flex" }}>
      <div className="postButton buttonBack" onClick={() => onClickBack()}>
        <AiOutlineRollback /> Назад
      </div>
    </div>
  );
};
