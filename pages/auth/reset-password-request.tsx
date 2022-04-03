import { FormikProvider, useFormik } from "formik";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { FormInput } from "src/common/Inputs";
import { SignBox } from "src/modules/Auth/SignBox/SignBox";
import common from "styles/common.module.css";
import sign from "src/modules/Auth/Sign.module.css";
import * as yup from "yup";
import { emailValidation } from "src/common/validation";
import { useResetPasswordForEmailRequest } from "../../src/modules/Auth/hooks/useResetPasswordRequest";
import clsx from "clsx";

export default function ResetPasswordRequest() {
  const resetPasswordForEmailMutation = useResetPasswordForEmailRequest();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object().shape({
      email: emailValidation
    }),
    onSubmit: ({ email }) => {
      resetPasswordForEmailMutation.mutate(email);
    }
  });

  return (
    <div className={clsx(common.signWrapper, common.wrapper)}>
      <SignBox imgSrc="/static/images/password-reset.png">
        <div className={sign.form}>
          <h1 className={sign.title}>Password reset</h1>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <FormInput
                name="email"
                type="email"
                label="email"
                autocomplete="email"
                rounded
              />
              <ActionButton
                text="Reset password"
                type="submit"
                rounded
                isLoading={resetPasswordForEmailMutation.isLoading}
              />
            </form>
            <div className={sign.footer}>
              <p>
                We will send you an email to confirm your password change
                request
              </p>
            </div>
          </FormikProvider>
        </div>
      </SignBox>
    </div>
  );
}
