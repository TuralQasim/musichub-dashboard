import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object({
  login: Yup.string()
    .min(5, "Minimum 5 symbols")
    .max(15, "Maximum 15 symbols")
    .required("Enter login"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(15, "Maximum 15 symbols")
    .required("Enter password"),
});
const Register = () => {
  const [auth, setAuth] = useState({});
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        const { data } = await axios.post(
          "https://api.music-hub.ru/account/create",
          {
            username: values.username,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        !!data && setAuth(data);
        console.log(data);
      }}
    >
      <Form className="auth_form">
        <h1>Registration</h1>
        <label htmlFor="">
          <p>Username</p>
          <Field
            name="username"
            type="text"
            placeholder="Type your username..."
          />
          <ErrorMessage className="authError" name="username" />
        </label>
        <label htmlFor="">
          <p>Password</p>
          <Field
            name="password"
            type="password"
            placeholder="Type your password..."
          />
          <ErrorMessage className="authError" name="password" />
        </label>
        <div className="auth_btns">
          <button type="submit">Create account</button>
          <Link to="/auth">Login</Link>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
