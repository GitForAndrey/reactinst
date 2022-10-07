import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/postsSlice";
import { selectActiveUser } from "../features/userSlice";

export const PostForm = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);

  const [text, setText] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [image, setImage] = useState([]);

  const onSetImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onTextChange = (e) => setText(e.target.value);
  const onVisibleChange = () => setFormVisible(!formVisible);
  const onAddPost = () => {
    if (image && text) {
      dispatch(addPost({ image, text, activeUser: activeUser.id }));
      setText("");
      setFormVisible(false);
    }
  };
  const addButton = (
    <button className="addButton" onClick={onVisibleChange}>
      Додати пост
    </button>
  );
  const postForm = (
    <>
      <form>
        <label htmlFor="postTitle"> Оберіть фото:</label>
        {image.length ? (
          <img className="postFormImage" src={image} alt="upload preview" />
        ) : null}
        <input type="file" accept="image/*" onChange={onSetImage} />
        <label htmlFor="postText">Текст посту:</label>
        <textarea
          id="postText"
          name="postText"
          value={text}
          onChange={onTextChange}
        />
        <button className="addButton" type="button" onClick={onAddPost}>
          Додати пост
        </button>
      </form>
      <button className="addButton" onClick={onVisibleChange}>
        Відміна
      </button>
    </>
  );
  return <section>{formVisible ? postForm : addButton}</section>;
};
