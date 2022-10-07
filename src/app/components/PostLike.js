import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

export const PostLike = ({ likes, userId, toggleLike }) => {
  const renderLikes = likes.map((e, i) =>
    i >= 4 ? null : <div className="postLikeIcon" key={i}></div>
  );
  const checkLike = likes.includes(userId);

  return (
    <div className="likeBox">
      <div className="iconBox">{renderLikes}</div>
      <div className="postLike" onClick={() => toggleLike(userId)}>
        {checkLike ? <AiFillLike color={"#1188FF"} /> : <AiOutlineLike />}
      </div>
      <div className="postLikeNum">{likes.length}</div>
    </div>
  );
};
