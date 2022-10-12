import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, postEdit } from "../features/postsSlice";
import { selectActiveUser } from "../features/userSlice";
import { ModalCustom } from "./ModalCustom";
import { PostEditButtons } from "./PostEditButtons";

export const ReviewPost = ({ post, visible, onClickBack }) => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);

  const [text, setText] = useState(post.text);
  const [image, setImage] = useState();
  const [edit, setEdit] = useState(false);

  const onClickEdit = () => {
    setEdit(!edit);
  };
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

  const onSetImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onTextChange = (e) => setText(e.target.value);

  const onAddPost = () => {
    if (image || text) {
      dispatch(addPost({ image, text, activeUser: activeUser.id }));
      setText("");
    }
  };
  const editPostForm = (
    <>
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
        <button
          className="addButton"
          type="button"
          onClick={() => onEditPost()}
        >
          Зберегти пост
        </button>
      </form>
      <button className="addButton" onClick={() => onClickEdit()}>
        Відміна
      </button>
    </>
  );

  const postTemplate = (
    <>
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div>
          <img
            className="postImage"
            src={post.image}
            width="100"
            height="100"
            alt="post content"
          />
          <p style={{ wordWrap: "break-word" }}>{post.text}</p>
        </div>
      </article>
      <PostEditButtons
        onClickBack={onClickBack}
        onClickEdit={onClickEdit}
        post={post}
      />
    </>
  );
  let content = edit ? editPostForm : postTemplate;

  return <ModalCustom visible={visible}>{content}</ModalCustom>;
};
//<PostEditButtons onClickBack={onClickBack} />
