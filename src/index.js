import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { getPosts } from "./app/features/postsSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorAllPosts } from "./app/pages/AuthorAllPosts";
import { AllPosts } from "./app/pages/AllPosts";
import { Login } from "./app/pages/Login";
import { PostEdit } from "./app/pages/PostEdit";

store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<AllPosts />} />
            <Route path="/authorAllPosts" element={<AuthorAllPosts />} />
            <Route path="post">
              <Route path=":postId" element={<PostEdit />} />
            </Route>
            <Route path="/login" element={<Login />} />

            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
