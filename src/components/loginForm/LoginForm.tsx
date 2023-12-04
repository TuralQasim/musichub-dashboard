import { useFormik } from "formik";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import "./loginForm.css";
import { IAuth } from "../../types/IAuth";
import { AppDispatch } from "../../store";
import { setAuth, setUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

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
const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const response = await axios.post("https://api.music-hub.ru/auth/local", {
        username: values.username,
        password: values.password,
      });
      const data: IAuth = await response.data;
      await localStorage.setItem("username", data.username);
      try {
        dispatch(setAuth(true));
        dispatch(setUser(data.username));
        navigate("/");
      } catch (e) {}
    },
  });
  return (
    <form className="auth_form" onSubmit={formik.handleSubmit}>
      <h2>Authorization</h2>
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
        <button type="submit">Login</button>
        <Link to="/register">Create account</Link>
      </div>
    </form>
  );
};

export default LoginForm;
