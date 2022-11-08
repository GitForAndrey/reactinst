import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const TemplatePage = ({ isAuth }) => {
  return (
    <>
      <Header isAuth={isAuth} />
      <main className="App">
        <ToastContainer autoClose={3000} position="top-center" />
        <Outlet />
      </main>
    </>
  );
};
