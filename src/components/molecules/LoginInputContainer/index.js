import React, { useState } from "react";
import Input from "../../atoms/input";
import Button from "../../atoms/button";
import Checkbox from "../../atoms/checkbox";

import { useFormik } from "formik";
import validationSchema from "../../../utils/loginValidation";
import classes from "./styles.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../../store/actions/main/authAction";
import { useHistory } from "react-router";
import { ROLE_STUDENT, ROLE_TEACHER, ROLE_ADMIN, ROLE_PAYMENT, ROLE_TUTOR } from "../../../utils/constants";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const LoginInputContainer = ({ type, role }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [err, setErr] = useState(false);
  const history = useHistory();
  const submitData = async (data) => {
    if (!checked && type) {
      setErr(true);
      return;
    }
    try {
      // Show Loader
      document.getElementById("loader").style.display = "flex";

      const result = await dispatch(login(data));
      if (result && result._doc) {
        toast.success("Logged In");
        //If the role is a teacher
        let data = result._doc;
        if (data && data.role === ROLE_TEACHER) {
          if (data.isVerified) {
            if (data.isOnBoarding) {
              history.push("/teacher/dashboard");
            } else {
              history.push("/teacher/onboard", {result});
            }
          } else {
            toast.error("User not verified")
          }
        } else if (data && data.role === ROLE_STUDENT) {
          if (data.isVerified) {
            const course = JSON.parse(localStorage.getItem('chosenCourse'))
            if (course) {
              history.push("/teacher-profile", { course });
            }
            else {
              history.push("/student/dashboard");
            }
          } else {
            toast.error("User not verified")
          }
        } else if (data && (data.role === ROLE_ADMIN || data.role === ROLE_PAYMENT || data.role === ROLE_TUTOR)) {
          if (data.isVerified) {
            history.push("/admin/dashboard");
          } else {
            toast.error("User not verified")
          }
        }
      }
      toast(result.errors[0].msg);
      // Hide Loader
      document.getElementById("loader").style.display = "none";
    } catch (e) {
      // Hide Loader
      document.getElementById("loader").style.display = "none";
      toast(e);
    }
  };

  const formik = useFormik({
    initialValues: {
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
        {formik.touched.email && formik.errors.email ? <div className={classes.error}>{formik.errors.email}</div> : null}
      </div>

      <div style={{ backgroundColor: '', textAlign: 'left', marginBottom: '20px' }}>
        <label htmlFor="password" style={{ textAlign: 'left', backgroundColor: '', marginBottom: '-40px', fontSize: '16px', fontWeight: '100' }}>Password</label>
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
        {formik.touched.password && formik.errors.password ? <div className={classes.error}>{formik.errors.password}</div> : null}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <Checkbox
          change={() => {
            setChecked((prev) => !prev);
            if (checked) setErr(false);
          }}
          value={formik.values.checkbox}
          id="checkbox"
          type="checkbox"
          label={type ? "I agree with Terms and Privacy" : "Remember me"}
        />
        {err ? <div className={classes.error}>Please check the box above</div> : null}
      </div>
      <Button type="submit" title="Log in" theme="primary" size="medium" style={{ fontSize: '17px' }} />
      <NavLink className={classes.forgotPassword} exact to="/auth/forgot-password" style={{ fontSize: '16px', marginTop: '10px' }}>
        Forgot password?
      </NavLink>
    </form>
  );
};

export default LoginInputContainer;
