import React from "react";
import { SplashScreen } from "src/common/SplashScreen/SplashScreen";
import { useUser } from "src/utils/useUser";
import styles from "./UserPanelPage.module.css";
import { SignBox } from "src/modules/Auth/SignBox/SignBox";
import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import { useUpdateUserNameAndSurname } from "../hooks/updateUserNameAndSurname";
import { FileInput, FormInput } from "src/common/Inputs";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import { useUpdateEmail } from "../hooks/updateEmail";
import { fileValidation } from "src/common/validation";
import { useUploadUserAvatar } from "../hooks/useUploadUserAvatar";

const validationSchema = yup.object().shape({
  email: yup.string().email("This isn't email").required("Email is required"),
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required")
});

export const UserPanelPage = () => {
  const { data, email, isLoading } = useUser();
  const updateUserNameSurname = useUpdateUserNameAndSurname();
  const updateEmail = useUpdateEmail();
  const formikPersonalData = useFormik({
    initialValues: {
      name: data?.name,
      surname: data?.surname
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      if (values && values.name && values.surname) {
        updateUserNameSurname.mutate({
          name: values.name,
          surname: values.surname
        });
      }
    }
  });
  const formikEmail = useFormik({
    initialValues: {
      email: email
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("This isn't email")
        .required("Email is required")
    }),
    onSubmit: ({ email }) => {
      if (email) {
        updateEmail.mutate(email);
      }
    }
  });
  const addAvatar = useUploadUserAvatar("add");
  const editAvatar = useUploadUserAvatar("edit");
  const formikAvatar = useFormik({
    initialValues: {
      file: null
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      file: fileValidation
    }),
    onSubmit: ({ file }) => {
      if (file) {
        if (!data?.avatar) {
          addAvatar.mutate(file);
        } else {
          editAvatar.mutate(file);
        }
      }
    }
  });

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <article className={styles.wrapper}>
      <SignBox imgSrc="/static/images/user.png" replaceLogoByTitle="User data">
        <div>
          <FormikProvider value={formikAvatar}>
            <form onSubmit={formikAvatar.handleSubmit}>
              <FileInput name="file" label="avatar" showAfterCrop={false} />
              <ActionButton
                text={`${data?.avatar ? "Update" : "Add"} avatar`}
                onClick={formikAvatar.handleSubmit}
                isLoading={
                  data?.avatar ? addAvatar.isLoading : editAvatar.isLoading
                }
              />
            </form>
          </FormikProvider>
          <FormikProvider value={formikEmail}>
            <form onSubmit={formikEmail.handleSubmit}>
              <FormInput name="email" label="email" />
              <ActionButton
                text="update email"
                type="submit"
                isLoading={updateEmail.isLoading}
              />
            </form>
          </FormikProvider>
          <FormikProvider value={formikPersonalData}>
            <form onSubmit={formikPersonalData.handleSubmit}>
              <FormInput name="name" label="name" />
              <FormInput name="surname" label="surname" />
              <ActionButton
                text="update personality"
                type="submit"
                isLoading={updateUserNameSurname.isLoading}
              />
            </form>
          </FormikProvider>
          <div className={styles.reset}>
            <LinkWrapper link={`/auth/reset-password-request?email=${email}`}>
              <OrangeButton text="Reset password" size="small" />
            </LinkWrapper>
          </div>
        </div>
      </SignBox>
    </article>
  );
};
