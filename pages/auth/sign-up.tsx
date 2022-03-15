import Link from "next/link";
import { SignBox } from "../../src/modules/Auth/SignBox/SignBox";
import common from "../../styles/common.module.css";
import sign from "../../src/modules/Auth/Sign.module.css";
import { FormikProvider, useFormik } from "formik";
import { FormInput } from "../../src/common/Inputs";
import * as yup from "yup";
import { ActionButton } from "../../src/common/ActionButton/ActionButton";
import {
  createPasswordValidation,
  emailValidation
} from "../../src/common/validation";
import { useCreateUser } from "../../src/modules/Auth/hooks/useCreateUser";
import clsx from "clsx";

//register
export default function Signup() {
  const createUserMutation = useCreateUser();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape({
      email: emailValidation,
      password: createPasswordValidation
    }),
    onSubmit: values => {
      createUserMutation.mutate(values);
    }
  });

  return (
    <div className={clsx(common.signWrapper, common.wrapper)}>
      <SignBox imgSrc="/static/images/sign.png">
        <div className={sign.form}>
          <h1 className={sign.title}>Zarejestruj się</h1>
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
              <ActionButton
                text="Stwórz konto"
                loading={createUserMutation.isLoading}
                type="submit"
                rounded
              />
            </form>
          </FormikProvider>
          <div className={sign.footer}>
            Posiadasz już konto?
            <Link passHref href="/auth/sign-in">
              <a className={sign.link}>Login</a>
            </Link>
          </div>
        </div>
      </SignBox>
    </div>
  );
}
