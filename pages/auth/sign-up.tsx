import Link from "next/link";
import { SignBox } from "../../src/modules/Auth/SignBox/SignBox";
import styles from "../../styles/common.module.css";
import sign from "../../src/modules/Auth/Sign.module.css";
import { FormikProvider, useFormik } from "formik";
import { FormInput } from "../../src/common/Inputs/FormInput";
import * as yup from "yup";
import { ActionButton } from "../../src/common/ActionButton/ActionButton";
import {
  createPasswordValidation,
  emailValidation
} from "../../src/common/validation";

//register
export default function Signup() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape({
      email: emailValidation,
      password: createPasswordValidation
    }),
    onSubmit: () => {
      //console.log(values);
    }
  });

  return (
    <div className={styles.signWrapper}>
      <SignBox imgSrc="/static/images/sign.png">
        <div className={sign.form}>
          <h1 className={sign.title}>Zarejestruj się</h1>
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
            <ActionButton text="Stwórz konto" onClick={formik.handleSubmit} />
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
