import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { supabase } from "../../utils/supabaseClient";
import { toast } from "react-toastify";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async values => {
          const { user, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password
          });
          if (error) {
            toast.error(error.message);
          }
          if (user) {
            toast.success(
              "Thank you for registration, confirm account by mail"
            );
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Register;
