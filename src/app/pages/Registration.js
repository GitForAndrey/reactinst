import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FormInput } from "../ui_elements/FormInput";
import { createNewUser, selectLoading } from "../features/userSlice";
import { Button } from "../ui_elements/Button";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";

export const Registration = ({ isAuth }) => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectLoading);

  useEffect(() => {
    if (isAuth) {
      navigate("/authorAllPosts");
    }
  }, [isAuth, navigate]);

  return (
    <div className="loginContainer">
      <h2>Реєстрація</h2>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Must be 6 characters or more";
          }
          if (!values.username) {
            errors.username = "Required";
          } else if (values.username.length < 4) {
            errors.username = "Must be 4 characters or more";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values) => {
          console.log(values);
          dispatch(createNewUser(values)).then((res) => {
            if (res.type === "users/createNewUser/fulfilled") {
              navigate("/login");
            }
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form name="form">
            <FormInput
              handleChange={handleChange}
              placeholder="Username"
              name="username"
              type="text"
              value={values.username}
              onBlur={handleBlur}
            >
              <AiOutlineUser className="inputIcon" />
              <ErrorMessage
                name="username"
                render={(msg) => <div className="inputError">{msg}</div>}
              />
            </FormInput>
            <FormInput
              handleChange={handleChange}
              placeholder="Email"
              name="email"
              type="email"
              onBlur={handleBlur}
              value={values.email}
            >
              <AiOutlineMail className="inputIcon" />
              <ErrorMessage
                name="email"
                render={(msg) => <div className="inputError">{msg}</div>}
              />
            </FormInput>

            <FormInput
              handleChange={handleChange}
              placeholder="Password"
              type="password"
              name="password"
              onBlur={handleBlur}
              value={values.password}
            >
              <AiOutlineLock className="inputIcon" />
              <ErrorMessage
                name="password"
                render={(msg) => <div className="inputError">{msg}</div>}
              />
            </FormInput>

            <Button
              title="Зареєструватись"
              loading={loadingStatus}
              disabled={isSubmitting}
              handleClick={handleSubmit}
            />
            <div className="regLink" onClick={() => navigate("/login")}>
              Вхід
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
