import React from "react";
import ReactLoading from "react-loading";

export const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactLoading type="spin" color="#1188FF" />
    </div>
  );
};
