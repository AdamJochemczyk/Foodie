import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { supabase } from "../../utils/supabaseClient";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async values => {
          const { user, error } = await supabase.auth.signIn({
            email: values.email,
            password: values.password
          });
          //TODO: session
          if (error) {
            toast.error(error.message);
          }
          if (user) {
            toast.success("You are logged in");
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

export default Login;
