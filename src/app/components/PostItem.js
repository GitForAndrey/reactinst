import React, { useState } from "react";
import { PostAuthor } from "./PostAuthor";
import { PostLike } from "./PostLike";
import { PostTime } from "./PostTime";
import { useSelector } from "react-redux";
import { selectActiveUser, selectAllUsers } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { postLikeUpdate, togglePostLike } from "../features/postsSlice";
import { ModalCustom } from "./ModalCustom";
import { PostButtons } from "./PostButtons";

export const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const activeUser = useSelector(selectActiveUser);
  const [modalVisible, setModalVisible] = useState(false);

  const onToggleLike = (userId) => {
    dispatch(togglePostLike({ userId, postId: post.id }));
    dispatch(postLikeUpdate({ postId: post.id }));
  };
  const onClickBack = () => {
    setModalVisible(false);
  };

  const postElement = (
    <article
      onClick={setModalVisible}
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
        <p style={{ wordWrap: "break-word" }}>
          {post.text.length < 100 ? post.text : `${post.text.slice(0, 100)}...`}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <PostAuthor id={post.userId} users={users} />
          <PostTime date={post.date} />
        </div>
        <div>
          <PostLike
            likes={post.likes}
            userId={activeUser.id}
            toggleLike={onToggleLike}
          />
        </div>
      </div>
    </article>
  );
  let content = modalVisible ? (
    <ModalCustom visible={modalVisible}>
      {postElement}
      <PostButtons onClickBack={onClickBack} />
    </ModalCustom>
  ) : (
    postElement
  );
  return content;
};
