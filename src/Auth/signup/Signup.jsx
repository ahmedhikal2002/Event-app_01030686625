import React from "react";
import "./signup.css";
import Heading from "../../Utils/Heading";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Store/AuthSlice/ThunkAuth";
import WithGuard from "../../Utils/WithGuard";
import InputFrom from "../../Utils/InputFrom";
import { SignupSchema } from "../../Utils/Yup";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(
        register({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        })
      )
        .unwrap()
        .catch((e) => toast.error(`Failed to signup ${e}`));
    },
  });

  return (
    <div className="flex-column ">
      <Heading>Signup</Heading>
      <form className="from" onSubmit={formik.handleSubmit}>
        <div className="flex-gap flex-wrap">
          <div className="flex-1">
            <InputFrom
              label="Frist Name"
              type="text"
              placeholder="Frist Name"
              formik={formik}
              id="frist-name"
              name="firstName"
            />
          </div>
          <div className="flex-1">
            <InputFrom
              label="Last Name"
              type="text"
              placeholder="Last Name"
              formik={formik}
              id="last-name"
              name="lastName"
            />
          </div>
        </div>

        <InputFrom
          label="Email"
          type="email"
          placeholder="please enter your email address"
          formik={formik}
          id="enail-aa"
          name="email"
        />

        <InputFrom
          label="Password"
          type="password"
          placeholder="enter a password"
          formik={formik}
          id="pass"
          name="password"
        />

        <InputFrom
          label="Confrim Password"
          type="password"
          placeholder="confirm your password"
          formik={formik}
          id="confrim-password"
          name="confirmPassword"
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Loading..." : "Signup"}
        </button>
        <Link to="/login" className="link">
          Already have an account
        </Link>
      </form>
    </div>
  );
}

export default WithGuard(Signup);
