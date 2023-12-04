import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { IAuth } from "../../types/IAuth";
import { AppDispatch } from "../../store";
import { setAuth, setUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import "./createPortfolio.css";

const schema = Yup.object({
  title: Yup.string()
    .min(5, "Minimum 5 symbols")
    .max(15, "Maximum 15 symbols")
    .required("Enter title"),
  coverUrl: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Enter cover URL"),
  // image: Yup.string().min(3, "Minimum 3 symbols").required("Enter cover URL"),
});

const CreatePortfolio = () => {
  const [trackUrl, setTrackUrl] = useState<any>(null);
  const [trackUrlErr, setTrackUrlErr] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      coverUrl: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!trackUrl) {
        return setTrackUrlErr(true);
      } else {
        const response = await axios.post(
          "https://api.music-hub.ru/portfolio/generate-assets-upload-urls"
        );
        const data = await response.data;
        console.log(response);
        // const response = await axios.post(
        //   "https://api.music-hub.ru/portfolio",
        //   {
        //     title: values.title,
        //     cover_url: values.coverUrl,
        //     resource_url: trackUrl,
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //     },
        //   }
        // );
        // const data = await response.data;
      }
    },
  });
  const changeTrackUrl = (e: any) => {
    setTrackUrl(e.target.files[0]);
    setTrackUrlErr(false);
  };
  return (
    <div className="create_portfolio">
      <form className="portfolio_form" onSubmit={formik.handleSubmit}>
        <label>
          <p>Title</p>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="title"
            value={formik.values.title}
            placeholder="type a title"
          />
        </label>
        <label>
          <p>Cover URL</p>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="coverUrl"
            value={formik.values.coverUrl}
            placeholder="type a cover URL"
          />
        </label>
        <label className="portfolio_image_label">
          <p>Portfolio image</p>
          <input
            onChange={(e) => e.target.files && changeTrackUrl(e)}
            type="file"
            name="image"
            placeholder="type a portfolio image"
          />
          {trackUrlErr ? <span>Choose image</span> : ""}
        </label>
        <button type="submit">Create portfolio</button>
      </form>
    </div>
  );
};

export default CreatePortfolio;
