import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { FormInput } from "../ui_elements/FormInput";
import { selectLoading, signInUser } from "../features/userSlice";
import { Button } from "../ui_elements/Button";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";

export const Login = ({ isAuth }) => {
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
      <h2>Вхід</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Must be 6 characters or more";
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
          dispatch(signInUser(values));
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form name="form">
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
              title="Увійти"
              loading={loadingStatus}
              disabled={isSubmitting}
              handleClick={handleSubmit}
            />
            <div className="regLink" onClick={() => navigate("/registration")}>
              Зареєструватись
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
