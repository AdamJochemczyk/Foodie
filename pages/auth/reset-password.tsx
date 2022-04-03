import { FormikProvider, useFormik } from "formik";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { FormInput } from "src/common/Inputs";
import { SignBox } from "src/modules/Auth/SignBox/SignBox";
import common from "styles/common.module.css";
import sign from "src/modules/Auth/Sign.module.css";
import { repeatPasswordSchema } from "src/common/validation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useResetPassword } from "src/modules/Auth/hooks/useResetPassword";
import clsx from "clsx";

export default function ResetPassword() {
  const router = useRouter();
  const { query, isReady } = router;
  const [authToken, setAuthToken] = useState("");
  const resetPasswordMutation = useResetPassword();

  const formik = useFormik({
    initialValues: { password: "", passwordConfirmation: "" },
    validationSchema: repeatPasswordSchema,
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
          <h1 className={sign.title}>Reset password</h1>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <FormInput
                name="password"
                type="password"
                label="password"
                autocomplete="new-password"
                rounded
              />
              <FormInput
                name="passwordConfirmation"
                type="password"
                label="repeat password"
                autocomplete="new-password"
                rounded
              />
              <ActionButton
                text="Reset password"
                type="submit"
                rounded
                isLoading={resetPasswordMutation.isLoading}
              />
            </form>
          </FormikProvider>
        </div>
      </SignBox>
    </div>
  );
}
