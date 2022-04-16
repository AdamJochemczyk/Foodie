import Link from "next/link";
import { SignBox } from "src/modules/Auth/SignBox/SignBox";
import common from "styles/common.module.css";
import sign from "src/modules/Auth/Sign.module.css";
import { FormikProvider, useFormik } from "formik";
import { FileInput, FormInput } from "src/common/Inputs";
import * as yup from "yup";
import { Button } from "src/common/Button/Button";
import {
  createPasswordValidation,
  emailValidation,
  fileValidation
} from "src/common/validation";
import { useCreateUser } from "src/modules/Auth/hooks/useCreateUser";
import clsx from "clsx";

//register
export default function Signup() {
  const createUserMutation = useCreateUser();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
      avatar: null
    },
    validationSchema: yup.object().shape({
      email: emailValidation,
      password: createPasswordValidation,
      name: yup.string().required("Name is required"),
      surname: yup.string().required("Surname is required"),
      avatar: fileValidation
    }),
    onSubmit: values => {
      createUserMutation.mutate(values);
    }
  });

  return (
    <div className={clsx(common.signWrapper, common.wrapper)}>
      <SignBox imgSrc="/static/images/sign.png">
        <div className={sign.form}>
          <h1 className={sign.title}>Sign up</h1>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <FormInput
                name="email"
                type="email"
                label="email"
                autocomplete="email"
                rounded
              />
              <FormInput
                name="password"
                type="password"
                label="password"
                autocomplete="new-password"
                rounded
              />
              <FormInput name="name" label="name" rounded />
              <FormInput name="surname" label="surname" rounded />
              <FileInput name="avatar" label="avatar" />
              <Button
                text="Create account"
                isLoading={createUserMutation.isLoading}
                type="submit"
                rounded
                size="small"
              />
            </form>
          </FormikProvider>
          <div className={sign.footer}>
            Already have an account?
            <Link passHref href="/auth/sign-in">
              <a className={sign.link}>Sign in</a>
            </Link>
          </div>
        </div>
      </SignBox>
    </div>
  );
}
