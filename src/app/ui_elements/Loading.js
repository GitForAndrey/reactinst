import React from "react";
import ReactLoading from "react-loading";

export const Loading = ({ color = "#0099FF", size = "19px" }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactLoading type="spin" color={color} height={size} width={size} />
    </div>
  );
};
