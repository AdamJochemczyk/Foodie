import { FormikProvider, useFormik } from "formik";
import { ActionButton } from "../../src/common/ActionButton/ActionButton";
import { FormInput } from "../../src/common/Inputs/FormInput";
import { SignBox } from "../../src/modules/Auth/SignBox/SignBox";
import common from "../../styles/common.module.css";
import sign from "../../src/modules/Auth/Sign.module.css";
import * as yup from "yup";
import { createPasswordValidation } from "../../src/common/validation";

const validationSchema = yup.object().shape({
  password: createPasswordValidation,
  passwordConfirmation: yup
    .string()
    // eslint-disable-next-line unicorn/no-null
    .oneOf([yup.ref("password"), null], "Hasła muszą być takie same")
});

export default function Signin() {
  const formik = useFormik({
    initialValues: { password: "", passwordConfirmation: "" },
    validationSchema: validationSchema,
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
              name="password"
              type="password"
              label="password"
              autocomplete="new-password"
            />
            <FormInput
              name="passwordConfirmation"
              type="password"
              label="potwierdz hasło"
              autocomplete="new-password"
            />
            <ActionButton text="Zresetuj hasło" onClick={formik.handleSubmit} />
          </FormikProvider>
        </div>
      </SignBox>
    </div>
  );
}
