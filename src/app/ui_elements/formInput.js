import React from "react";

export const FormInput = ({
  children,
  placeholder,
  handleChange,
  onBlur,
  type,
  value,
  name,
}) => {
  return (
    <div className="input_wrap">
      {children}
      <input
        className="formInput"
        type={type}
        name={name}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
