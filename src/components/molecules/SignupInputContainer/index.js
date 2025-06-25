import React, { useState } from "react";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import { useFormik } from "formik";
import validationSchema from "../../../utils/signupValidation";
import classes from "./styles.module.css";
import { useDispatch } from "react-redux";
import { signup } from "../../../store/actions/main/authAction";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SignupInputContainer = ({ type, role }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [err, setErr] = useState(false);
  const history = useHistory();

  const submitData = async (data) => {
    if (!checked && type) {
      setErr(true);
      return;
    }

    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";

    try {
      const response = await dispatch(signup(data));

      if (response) {
        if (response.data.status) {
          toast.success("Account created successfully. Please log in.");

          // ✅ Stop loader
          if (loader) loader.style.display = "none";

          // ✅ Redirect to login
          history.push("/login");
          return;
        } else if (response.data.message === "User Already Exists") {
          toast.error("User already exists.");
        } else {
          toast.error(response.data.message || "Signup failed.");
        }
      } else {
        toast.error("Server error. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again later.");
    }

    // ✅ Always stop loader in the end
    if (loader) loader.style.display = "none";
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submitData({ ...values, role: role });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.inputContainer} method="post">
      {type && (
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label htmlFor="fullName" style={{ fontSize: "16px", fontWeight: "100" }}>
            Full Name
          </label>
          <Input
            onBlur={formik.handleBlur}
            change={formik.handleChange}
            value={formik.values.fullName}
            name="fullName"
            id="fullName"
            type="text"
            placeholder="Your Name"
            theme="primary"
            style={{ fontSize: "15px", marginTop: "-10px" }}
          />
        </div>
      )}
      {type && formik.touched.fullName && formik.errors.fullName && (
        <div className={classes.error}>{formik.errors.fullName}</div>
      )}

      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <label htmlFor="email" style={{ fontSize: "16px", fontWeight: "100" }}>
          Email
        </label>
        <Input
          onBlur={formik.handleBlur}
          change={formik.handleChange}
          value={formik.values.email}
          name="email"
          type="email"
          id="email"
          placeholder="example@mail.com"
          style={{ fontSize: "15px", marginTop: "-10px" }}
        />
      </div>
      {formik.touched.email && formik.errors.email && (
        <div className={classes.error}>{formik.errors.email}</div>
      )}

      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <label htmlFor="password" style={{ fontSize: "16px", fontWeight: "100" }}>
          Password
        </label>
        <Input
          onBlur={formik.handleBlur}
          change={formik.handleChange}
          value={formik.values.password}
          name="password"
          type="password"
          id="password"
          placeholder="at least 8 characters"
          style={{ fontSize: "15px", marginTop: "-10px" }}
        />
      </div>
      {formik.touched.password && formik.errors.password && (
        <div className={classes.error}>{formik.errors.password}</div>
      )}

      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input
          type="checkbox"
          id="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(prev => !prev);
            if (!checked) setErr(false);
          }}
          style={{ width: "15px", height: "15px" }}
        />
        <label htmlFor="checkbox" style={{ cursor: "pointer", fontSize: "16px" }}>
          I agree with &nbsp;
          <Link to="/privacy-policy">Terms and Privacy</Link>
        </label>
      </div>
      {err && <div className={classes.error}>Please check the box above</div>}

      <Button type="submit" title="Sign up" theme="primary" size="medium" style={{ fontSize: "17px" }} />
    </form>
  );
};

export default SignupInputContainer;
