import { FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { ActionButton } from "../../src/common/ActionButton/ActionButton";
import { FormInput } from "../../src/common/Inputs/FormInput";
import { SignBox } from "../../src/modules/Auth/SignBox/SignBox";
import common from "../../styles/common.module.css";
import sign from "../../src/modules/Auth/Sign.module.css";
import * as yup from "yup";
import {
  emailValidation,
  passwordValidation
} from "../../src/common/validation";

export default function Signin() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape({
      email: emailValidation,
      password: passwordValidation
    }),
    onSubmit: () => {
      //
    }
  });

  return (
    <div className={common.signWrapper}>
      <SignBox imgSrc="/static/images/sign.png">
        <div className={sign.form}>
          <h1>Zaloguj się</h1>
          <FormikProvider value={formik}>
            <FormInput
              name="email"
              type="email"
              label="email"
              autocomplete="email"
            />
            <FormInput
              name="password"
              type="password"
              label="password"
              autocomplete="new-password"
            />
            <div className={sign.helperBox}>
              <div>
                <input type="checkbox" name="rememberMe" />
                <label htmlFor="rememberMe">Pamiętaj mnie</label>
              </div>
              <Link href="/auth/reset-password-request" passHref>
                <a className={sign.link}>Zapomniałeś hasła?</a>
              </Link>
            </div>
            <ActionButton text="Zaloguj się" onClick={formik.handleSubmit} />
          </FormikProvider>
          <div className={sign.helperBox}>
            <p>Nie masz konta?</p>
            <Link href="/auth/sign-up" passHref>
              <a className={sign.link}>Stwórz konto</a>
            </Link>
          </div>
        </div>
      </SignBox>
    </div>
  );
}
