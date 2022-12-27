import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import "./SignUp.css";

export const SignUp = () => {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, "Must be 20 characters or less.")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less.")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Must be 8 characters or more.")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold-display-4">Sign Up</h1>
            <Form>
              <TextField type="text" label="First Name:" name="firstName" />
              <TextField type="text" label="Last Name:" name="lastName" />
              <TextField type="text" label="Email:" name="email" validate />
              <TextField type="password" label="Password:" name="password" />
              <TextField
                type="password"
                label="Confirm Password:"
                name="confirmPassword"
              />
              <button type="submit" className="btn btn-lg btn-dark mt-3 submit">
                Sign Up
              </button>
              <button type="reset" className="btn btn-lg btn-danger mt-3">
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
