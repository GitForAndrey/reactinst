import React from "react";
import { PostLike } from "./PostLike";
import { PostTime } from "./PostTime";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectActiveUser, selectIsAuth } from "../features/userSlice";
import { postLikeUpdate, togglePostLike } from "../features/postsSlice";
import { toast } from "react-toastify";

export const PostItem = ({ post, fullText }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeUser = useSelector(selectActiveUser);
  const isAuth = useSelector(selectIsAuth);

  const onToggleLike = (userId) => {
    if (isAuth) {
      dispatch(togglePostLike({ userId, postId: post.id }));
      dispatch(postLikeUpdate({ postId: post.id }));
    } else {
      toast.error("Спочатку потрібно авторизуватись!");
    }
  };

  const goToPost = () => {
    if (isAuth) {
      navigate(`/post/${post.id}`);
    } else {
      toast.error("Спочатку потрібно авторизуватись!");
    }
  };

  const postText = fullText
    ? post.text
    : post.text.length < 100
    ? post.text
    : `${post.text.slice(0, 100)}...`;

  return (
    <>
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div onClick={() => goToPost()}>
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
            <div className="author">Автор: {post.authorName}</div>
            <PostTime date={post.date} />
          </div>
          <div>
            <PostLike
              likes={post.likes}
              userId={activeUser.uid}
              toggleLike={onToggleLike}
            />
          </div>
        </div>
      </article>
    </>
  );
};
