import React, { useRef, useState } from "react";
import backgroundImage from "../image/addFile.png";

export const InputFile = ({ onSetImage }) => {
  const hiddenFileInput = useRef(null);
  const [prevImg, setPrevImage] = useState();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setPrevImage(URL.createObjectURL(fileUploaded));

    onSetImage(fileUploaded);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <img
          src={backgroundImage}
          onClick={handleClick}
          style={{
            width: "120px",
            height: "120px",
            cursor: "pointer",
            opacity: "0.3",
          }}
        ></img>
        {prevImg && (
          <img
            src={prevImg}
            alt="preview"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        )}
      </div>
      <input
        type="file"
        ref={hiddenFileInput}
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};
