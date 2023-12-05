import { useFormik } from "formik";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import "./createPortfolio.css";
import { uploadFile } from "../../utils/uploadFile";

const schema = Yup.object({
  title: Yup.string()
    .min(5, "Minimum 5 symbols")
    .max(15, "Maximum 15 symbols")
    .required("Enter title"),
  coverUrl: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Enter cover URL"),
  image: Yup.mixed()
    .required("Choose image")
    .test(
      "FILE_TYPE",
      "Invalid type of file",
      (value: any) => value && ["image/png", "image/jpeg"].includes(value.type)
    )
    .test(
      "FILE_SIZE",
      "Too big!",
      (value: any) => value && value.size < 1024 * 1024
    ),
});

const CreatePortfolio = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await axios.post(
        "https://api.music-hub.ru/portfolio/generate-assets-upload-urls"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  const postPortfolio = async (data: any) => {
    try {
      const response = await axios.post(
        "https://api.music-hub.ru/portfolio/",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      coverUrl: "",
      image: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const { cover } = await getData();
        const status = await uploadFile(cover.uploadUrl, values.image);
        if (status && +status == 200) {
          const portfolio = {
            title: values.title,
            cover_url: values.coverUrl,
            resource_url: cover.cdnUrl,
          };
          const dataPortfolio = await postPortfolio(portfolio);
          if (dataPortfolio) {
            values.coverUrl = "";
            values.image = "";
            values.title = "";
            imgRef.current && (imgRef.current.value = "");
            navigate("/");
          }
        }
      } finally {
      }
    },
  });

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
          {formik.errors.title ? <span>{formik.errors.title}</span> : ""}
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
          {formik.errors.coverUrl ? <span>{formik.errors.coverUrl}</span> : ""}
        </label>
        <label className="portfolio_image_label">
          <p>Portfolio image</p>
          <input
            onChange={(e) =>
              e.target.files && formik.setFieldValue("image", e.target.files[0])
            }
            type="file"
            name="image"
            placeholder="type a portfolio image"
            ref={imgRef}
          />
          {formik.errors.image ? <span>{formik.errors.image}</span> : ""}
        </label>
        <button type="submit">Create portfolio</button>
      </form>
    </div>
  );
};

export default CreatePortfolio;
