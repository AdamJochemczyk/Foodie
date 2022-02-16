import { FormikProvider, useFormik } from "formik";
import { ActionButton } from "../../src/common/ActionButton/ActionButton";
import { FormInput } from "../../src/common/Inputs/FormInput";
import { SignBox } from "../../src/modules/Auth/SignBox/SignBox";
import common from "../../styles/common.module.css";
import sign from "../../src/modules/Auth/Sign.module.css";
import * as yup from "yup";
import { emailValidation } from "../../src/common/validation";

export default function Signin() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object().shape({
      email: emailValidation
    }),
    onSubmit: () => {
      //
    }
  });

  return (
    <div className={common.signWrapper}>
      <SignBox imgSrc="/static/images/password-reset.png">
        <div className={sign.form}>
          <h1 className={sign.title}> Zresetuj hasło</h1>
          <FormikProvider value={formik}>
            <FormInput
              name="email"
              type="email"
              label="email"
              autocomplete="email"
            />
            <ActionButton text="Zresetuj hasło" onClick={formik.handleSubmit} />
            <div className={sign.footer}>
              <p>
                Wyślemy do Ciebie maila z potwierdzeniem prośby o zmianę hasła
              </p>
            </div>
          </FormikProvider>
        </div>
      </SignBox>
    </div>
  );
}
