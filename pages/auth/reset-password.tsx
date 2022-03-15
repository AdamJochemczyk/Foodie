import { FormikProvider, useFormik } from "formik";
import { ActionButton } from "../../src/common/ActionButton/ActionButton";
import { FormInput } from "../../src/common/Inputs";
import { SignBox } from "../../src/modules/Auth/SignBox/SignBox";
import common from "../../styles/common.module.css";
import sign from "../../src/modules/Auth/Sign.module.css";
import * as yup from "yup";
import { createPasswordValidation } from "../../src/common/validation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useResetPassword } from "../../src/modules/Auth/hooks/useResetPassword";
import clsx from "clsx";

const validationSchema = yup.object().shape({
  password: createPasswordValidation,
  passwordConfirmation: yup
    .string()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return (
    <div className={clsx(common.signWrapper, common.wrapper)}>
      <SignBox imgSrc="/static/images/password-reset.png">
        <div className={sign.form}>
          <h1 className={sign.title}> Zresetuj hasło</h1>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <FormInput
                name="password"
                type="password"
                label="hasło"
                autocomplete="new-password"
                rounded
              />
              <FormInput
                name="passwordConfirmation"
                type="password"
                label="potwierdz hasło"
                autocomplete="new-password"
                rounded
              />
              <ActionButton text="Zresetuj hasło" type="submit" rounded />
            </form>
          </FormikProvider>
        </div>
      </SignBox>
    </div>
  );
}
