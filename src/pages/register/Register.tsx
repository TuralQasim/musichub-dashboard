import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object({
  username: Yup.string()
    .min(5, "Minimum 5 symbols")
    .max(15, "Maximum 15 symbols")
    .required("Enter login"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(15, "Maximum 15 symbols")
    .required("Enter password"),
});
const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const response = await axios.post(
        "https://api.music-hub.ru/account/create",
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    },
  });
  return (
    <form className="auth_form" onSubmit={formik.handleSubmit}>
      <h2>Registration</h2>
      <label htmlFor="">
        <p>Username</p>
        <input
          name="username"
          value={formik.values.username}
          type="text"
          placeholder="Type your username..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span>
          {formik.errors.username &&
            formik.touched.username &&
            formik.errors.username}
        </span>
      </label>
      <label htmlFor="">
        <p>Password</p>
        <input
          name="password"
          type="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Type your password..."
        />
        <span>
          {formik.errors.password &&
            formik.touched.password &&
            formik.errors.password}
        </span>
      </label>
      <div className="auth_btns">
        <button type="submit">Create account</button>
        <Link to="/auth">Login</Link>
      </div>
    </form>
  );
};

export default Register;
