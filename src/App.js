import React, { useEffect } from "react";
import { AuthorAllPosts } from "./app/pages/AuthorAllPosts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Header } from "./app/components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="App">
        <ToastContainer autoClose={3000} position="top-center" />
        <Outlet />
      </main>
    </>
  );
}

export default App;
