import React, { useState } from "react";

export const FormInput = ({ children, placeholder, handleChange, type }) => {
  const [value, setValue] = useState("");
  const returnChange = (item) => {
    setValue(item.value);
    handleChange(item.value, item.name);
  };

  return (
    <div className="input_wrap">
      {children}
      <input
        className="formInput"
        type={type}
        name={placeholder}
        value={value}
        placeholder={placeholder}
        onChange={(e) => returnChange(e.target)}
      />
    </div>
  );
};
