import React, { useState } from "react";
import { PostAuthor } from "./PostAuthor";
import { PostLike } from "./PostLike";
import { PostTime } from "./PostTime";
import { useSelector } from "react-redux";
import { selectActiveUser, selectAllUsers } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { postLikeUpdate, togglePostLike } from "../features/postsSlice";
import { ReviewPost } from "./ReviewPost";

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
  let postText =
    post.text.length < 100 ? post.text : `${post.text.slice(0, 100)}...`;

  const postElement = (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <div onClick={setModalVisible}>
        <img
          className="postImage"
          src={post.image}
          width="100"
          height="100"
          alt="post content"
        />
        <p style={{ wordWrap: "break-word" }}>{postText}</p>
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

  return (
    <>
      {postElement}
      {modalVisible && (
        <ReviewPost
          visible={modalVisible}
          onClickBack={onClickBack}
          post={post}
        />
      )}
    </>
  );
};
