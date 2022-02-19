import { FormikProvider, useFormik } from "formik";
import { ActionButton } from "../../src/common/ActionButton/ActionButton";
import { FormInput } from "../../src/common/Inputs/FormInput";
import { SignBox } from "../../src/modules/Auth/SignBox/SignBox";
import common from "../../styles/common.module.css";
import sign from "../../src/modules/Auth/Sign.module.css";
import * as yup from "yup";
import { createPasswordValidation } from "../../src/common/validation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useResetPassword } from "../../src/modules/Auth/hooks/useResetPassword";

const validationSchema = yup.object().shape({
  password: createPasswordValidation,
  passwordConfirmation: yup
    .string()
    // eslint-disable-next-line unicorn/no-null
    .oneOf([yup.ref("password"), null], "Hasła muszą być takie same")
});

export default function ResetPassword() {
  const router = useRouter();
  const { query, isReady } = router;
  const [authToken, setAuthToken] = useState("");
  const resetPasswordMutation = useResetPassword();

  const formik = useFormik({
    initialValues: { password: "", passwordConfirmation: "" },
    validationSchema: validationSchema,
    onSubmit: ({ password }) => {
      resetPasswordMutation.mutate({
        authToken,
        password
      });
    }
  });

  useEffect(() => {
    if (!isReady) return;
    if (query.authToken && typeof query.authToken === "string") {
      setAuthToken(query.authToken);
    } else {
      router.push("/");
    }
  }, [isReady]);

  return (
    <div className={common.signWrapper}>
      <SignBox imgSrc="/static/images/password-reset.png">
        <div className={sign.form}>
          <h1 className={sign.title}> Zresetuj hasło</h1>
          <FormikProvider value={formik}>
            <form>
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
              <ActionButton
                text="Zresetuj hasło"
                onClick={formik.handleSubmit}
                type="submit"
              />
            </form>
          </FormikProvider>
        </div>
      </SignBox>
    </div>
  );
}