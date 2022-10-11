import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/postsSlice";
import { selectActiveUser } from "../features/userSlice";
import { ModalCustom } from "./ModalCustom";

export const PostForm = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);

  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState([]);

  const onSetImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onTextChange = (e) => setText(e.target.value);
  const onModalChange = () => setModalVisible(!modalVisible);

  const onAddPost = () => {
    if (image && text) {
      dispatch(addPost({ image, text, activeUser: activeUser.id }));
      setText("");
      setModalVisible(false);
    }
  };
  const addButton = (
    <button className="addButton" onClick={onModalChange}>
      Додати пост
    </button>
  );
  const postForm = (
    <ModalCustom visible={modalVisible}>
      <form>
        <label htmlFor="postTitle"> Оберіть фото:</label>

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
      <button className="addButton" onClick={onModalChange}>
        Відміна
      </button>
    </ModalCustom>
  );
  return <section>{modalVisible ? postForm : addButton}</section>;
};
