import React, { useState } from "react";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
// import Checkbox from "../../atoms/checkbox";

import { useFormik } from "formik";
import validationSchema from "../../../utils/signupValidation";
import classes from "./styles.module.css";
import { useDispatch } from "react-redux";
import { signup } from "../../../store/actions/main/authAction";
import { useHistory } from "react-router";
import { getRole } from "../../../utils/util";
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
    // Show Loader
    document.getElementById("loader").style.display = "flex";
    try {
      // Show Loader
      document.getElementById("loader").style.display = "flex";
      const response = await dispatch(signup(data));
      if (response) {
        const role = getRole();
        console.log(response, "REsponse");
        if (response.data.status) {
          toast.success("Check your mail for verification link");
          console.log(`/${role}/verifyEmail`, "R");
          history.push(`/${role}/verifyEmail`);
        } else if (response.data.message === "User Already Exists") {
          toast.error("User Already Exists");
        }
      } else {
        toast.error("Server Error, Please try again later");
      }
    } catch (error) {
      document.getElementById("loader").style.display = "none";
    }
    // Hide Loader
    document.getElementById("loader").style.display = "none";
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      submitData({ ...values, role: role });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.inputContainer} method="post">
      {type && (
        <div style={{ backgroundColor: '', textAlign: 'left', marginBottom: '20px' }}>
          <label htmlFor="email" style={{ textAlign: 'left', marginBottom: '-100px', fontSize: '16px', fontWeight: '100' }}>Full Name</label>
          <Input
            onBlur={formik.handleBlur}
            change={formik.handleChange}
            value={formik.values.fullName}
            // label="Full Name"
            name="fullName"
            id="fullName"
            type="text"
            placeholder="Your Name"
            theme="primary"
            style={{ fontSize: '15px', marginTop: '-10px' }}
          />
        </div>
      )}
      {type && formik.touched.fullName && formik.errors.fullName ? <div className={classes.error}>{formik.errors.fullName}</div> : null}
      <div style={{ backgroundColor: '', textAlign: 'left', marginBottom: '20px' }}>
        <label htmlFor="email" style={{ textAlign: 'left', marginBottom: '-100px', fontSize: '16px', fontWeight: '100' }}>Email</label>
        <Input
          onBlur={formik.handleBlur}
          change={formik.handleChange}
          value={formik.values.email}
          // label="Email"
          name="email"
          type="email"
          id="email"
          placeholder="example@mail.com"
          style={{ fontSize: '15px', marginTop: '-10px' }}
        />
      </div>
      {formik.touched.email && formik.errors.email ? <div className={classes.error}>{formik.errors.email}</div> : null}
      <div style={{ backgroundColor: '', textAlign: 'left', marginBottom: '20px' }}>
        <label htmlFor="email" style={{ textAlign: 'left', marginBottom: '-100px', fontSize: '16px', fontWeight: '100' }}>Password</label>
        <div style={{ marginTop: '-10px' }}>
          <Input
            onBlur={formik.handleBlur}
            change={formik.handleChange}
            value={formik.values.password}
            // label="Password"
            name="password"
            type="password"
            id="password"
            placeholder="at least 8 characters"
            style={{ fontSize: '15px' }}
          />
        </div>
      </div>
      {formik.touched.password && formik.errors.password ? <div className={classes.error}>{formik.errors.password}</div> : null}

      {/* <Checkbox
        onClick={() => {
          setChecked(!checked);
          console.log(checked);
          if (!checked) setErr(false);
        }}
        value={formik.values.checkbox}
        id="checkbox"
        type="checkbox"
        label={type ? "I agree with Terms and Privacy" : "Remember Me"}
        redirectUrl="/privacy-policy"
      /> */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          value={formik.values.Checkbox}
          id="checkbox"
          onChange={() => {
            setChecked((prev) => !prev);
            if (checked) setErr(false);
          }}
          style={{ width: '15px', height: '15px' }}
        />
        <label htmlFor="checkbox" style={{ cursor: 'pointer', fontSize: '16px', textAlign: 'left', padding: '0' }}>
          I agree with &nbsp;
          <Link to="/privacy-policy">
            Terms and Privacy
          </Link>
        </label>
      </div>
      {err ? <div className={classes.error}>Please check the box above</div> : null}
      <Button type="submit" title="Sign up" theme="primary" size="medium" style={{ fontSize: '17px' }} />
    </form>
  );
};

export default SignupInputContainer;
