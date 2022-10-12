import React, { useEffect } from "react";
import { AuthorAllPosts } from "./app/pages/AuthorAllPosts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main className="App">
      <ToastContainer autoClose={3000} position="top-center" />
      <AuthorAllPosts />
    </main>
  );
}

export default App;
