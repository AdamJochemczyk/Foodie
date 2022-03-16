import { FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { FormInput } from "src/common/Inputs";
import { SignBox } from "src/modules/Auth/SignBox/SignBox";
import common from "styles/common.module.css";
import sign from "src/modules/Auth/Sign.module.css";
import * as yup from "yup";
import { emailValidation, passwordValidation } from "src/common/validation";
import { useLogin } from "src/modules/Auth/hooks/useLogin";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

export default function Signin() {
  const loginMutation = useLogin();

  const [rememberedEmail, setRememberedEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRememberedEmail(localStorage.getItem("loginEmail") || "");
      if (rememberedEmail) {
        setRememberMe(true);
      }
    }
  }, [rememberedEmail]);

  const formik = useFormik({
    initialValues: { email: rememberedEmail, password: "" },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      email: emailValidation,
      password: passwordValidation
    }),
    onSubmit: values => {
      loginMutation.mutate(values);
      if (rememberMe && typeof window !== "undefined") {
        localStorage.setItem("loginEmail", values.email);
      }
    }
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChecked = useCallback(() => {
    setRememberMe(rememberMe => !rememberMe);
  }, []);

  return (
    <div className={clsx(common.signWrapper, common.wrapper)}>
      <SignBox imgSrc="/static/images/sign.png">
        <div className={sign.form}>
          <h1>Zaloguj się</h1>
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
              <div className={sign.helperBox}>
                <div>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMeChecked}
                  />
                  <label htmlFor="rememberMe">Pamiętaj mnie</label>
                </div>
                <Link href="/auth/reset-password-request" passHref>
                  <a className={sign.link}>Zapomniałeś hasła?</a>
                </Link>
              </div>
              <ActionButton
                text="Zaloguj się"
                loading={loginMutation.isLoading}
                type="submit"
                rounded
              />
            </form>
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
