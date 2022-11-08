import React from "react";
import { Loading } from "./Loading";

export const Button = ({ title, loading, handleClick, disabled }) => {
  return (
    <button
      type="submit"
      disabled={loading === "loading" || disabled}
      className="button"
      onClick={handleClick}
    >
      {loading === "loading" ? <Loading color="#fff" /> : title}
    </button>
  );
};
