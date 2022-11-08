import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostLike } from "../components/PostLike";
import { PostTime } from "../components/PostTime";
import { useSelector, useDispatch } from "react-redux";
import { postLikeUpdate, togglePostLike } from "../features/postsSlice";
import { PostEditButtons } from "../components/PostEditButtons";
import { selectActiveUser } from "../features/userSlice";

export const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const activeUser = useSelector(selectActiveUser);
  const [post] = useSelector((state) => state.posts.posts).filter(
    (post) => post.id === postId
  );
  const dispatch = useDispatch();

  const onToggleLike = (userId) => {
    dispatch(togglePostLike({ userId, postId: post.id }));
    dispatch(postLikeUpdate({ postId: post.id }));
  };
  const onClickEdit = () => {
    navigate(`/post/${post.id}/edit`, { state: post });
  };

  const buttonContent = (
    <PostEditButtons
      activeUser={activeUser.uid}
      post={post}
      onClickEdit={onClickEdit}
    />
  );
  return (
    <div className="postContainer">
      <article
        style={{
          width: "600px",
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="author">Автор: {post.authorName}</div>
            <PostTime date={post.date} />
          </div>
          <div>
            <PostLike
              likes={post.likes}
              userId={post.authorId}
              toggleLike={onToggleLike}
            />
          </div>
        </div>
        {buttonContent}
      </article>
    </div>
  );
};
