import React from "react";
import { useSelector } from "react-redux";
import { PostForm } from "../components/PostForm";
import { PostItem } from "../components/PostItem";
import { selectAllPosts } from "../features/posts/postsSlice";

export const AuthorAllPosts = () => {
  const posts = useSelector(selectAllPosts);
  const sortedData = posts
    ?.slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderPosts = sortedData.map((e) => {
    return <PostItem post={e} key={e.id} />;
  });

  return (
    <>
      <PostForm />
      <section className="postSection">{renderPosts}</section>
    </>
  );
};
