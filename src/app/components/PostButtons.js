import React from "react";
import { AiOutlineRollback, AiFillEdit, AiOutlineDelete } from "react-icons/ai";

export const PostButtons = ({ onClickBack }) => {
  return (
    <div
      className="buttonsBlock"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <div className="postButton buttonBack" onClick={onClickBack}>
        <AiOutlineRollback /> Назад
      </div>
      <div className="postButton buttonEdit">
        {" "}
        <AiFillEdit />
        Редагувати
      </div>
      <div className="postButton buttonDelete">
        <AiOutlineDelete /> Видалити
      </div>
    </div>
  );
};
