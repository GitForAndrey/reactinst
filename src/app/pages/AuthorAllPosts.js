import React from "react";
import { useSelector } from "react-redux";
import { PostForm } from "../components/PostForm";
import { PostItem } from "../components/PostItem";
import { selectAllPosts, selectLoading } from "../features/postsSlice";
import { Loading } from "../components/Loading";

export const AuthorAllPosts = () => {
  const posts = useSelector(selectAllPosts);
  const loadingStatus = useSelector(selectLoading);

  const sortedData = posts
    ?.slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderPosts = sortedData.map((e) => {
    return <PostItem post={e} key={e.id} />;
  });
  let postsContent = !posts.length ? (
    <div style={{ textAlign: "center", color: "darkgray" }}>Постів немає</div>
  ) : (
    <section className="postSection">{renderPosts}</section>
  );
  return (
    <>
      <PostForm />
      {loadingStatus === "loading" ? <Loading /> : postsContent}
    </>
  );
};
