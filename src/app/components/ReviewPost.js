import React from "react";
import { useNavigate } from "react-router-dom";
import { ModalCustom } from "./ModalCustom";
import { PostEditButtons } from "./PostEditButtons";

export const ReviewPost = ({ post, visible, onClickBack }) => {
  const navigate = useNavigate();

  const onClickEdit = () => {
    navigate(`/post/${post.id}`, { state: post });
  };

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

  return <ModalCustom visible={visible}>{postTemplate}</ModalCustom>;
};
