import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postEdit } from "../features/postsSlice";
import { InputFile } from "../components/InputFileCustom";

export const PostEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state;
  const [text, setText] = useState(post.text);
  const [image, setImage] = useState();

  const onClickBack = () => {
    navigate(-1);
  };
  const onSetImage = (file) => {
    setImage(file);
  };

  const onTextChange = (e) => setText(e.target.value);
  const onEditPost = () => {
    let imageEdit = image ? image : post.image;
    dispatch(
      postEdit({
        text,
        image: imageEdit,
        postId: post.id,
        oldImage: post.image,
      })
    );
    onClickBack();
  };
  return (
    <>
      {console.log(location)}
      <form>
        <label htmlFor="postTitle"> Оберіть фото:</label>

        <InputFile onSetImage={onSetImage} />
        <label htmlFor="postText">Текст посту:</label>
        <textarea
          id="postText"
          name="postText"
          value={text}
          onChange={onTextChange}
        />
        <button
          className="addButton"
          type="button"
          onClick={() => onEditPost()}
        >
          Зберегти пост
        </button>
      </form>
      <button className="addButton" onClick={onClickBack}>
        Відміна
      </button>
    </>
  );
};
