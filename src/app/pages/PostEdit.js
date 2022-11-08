import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { postEdit } from "../features/postsSlice";
import { InputFile } from "../components/InputFileCustom";
import { selectActiveUser } from "../features/userSlice";

export const PostEdit = () => {
  const paramsNav = useParams();
  const activeUser = useSelector(selectActiveUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state;
  const [text, setText] = useState(post.text);
  const [image, setImage] = useState();
  console.log(paramsNav);
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
        activeUser: activeUser.uid,
      })
    );
    onClickBack();
  };
  return (
    <>
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
