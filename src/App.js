import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "./app/features/userSlice";
import { AuthorAllPosts } from "./app/pages/AuthorAllPosts";
import { AllPosts } from "./app/pages/AllPosts";
import { Login } from "./app/pages/Login";
import { PostEdit } from "./app/pages/PostEdit";
import { PrivateWrapper } from "./app/components/PrivatWrapper";
import { TemplatePage } from "./app/pages/TemplatePage";
import { Post } from "./app/pages/Post";
import { Registration } from "./app/pages/Registration";

function App() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <Routes>
      <Route path="/" element={<TemplatePage isAuth={isAuth} />} exact>
        <Route index element={<AllPosts />} />
        <Route element={<PrivateWrapper isAuth={isAuth} />}>
          <Route path="/authorAllPosts" element={<AuthorAllPosts />} />
          <Route path="post">
            <Route path=":postId" element={<Post />} />
            <Route path=":postId/edit" element={<PostEdit />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login isAuth={isAuth} />} />
        <Route
          path="/registration"
          element={<Registration isAuth={isAuth} />}
        />

        <Route
          path="*"
          element={
            <main>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
