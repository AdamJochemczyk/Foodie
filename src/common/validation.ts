import * as yup from "yup";

export const emailValidation = yup
  .string()
  .email("Email musi zawierać znak @")
  .required("Email jest wymagany");

export const createPasswordValidation = yup
  .string()
  .min(
    12,
    "Hasło jest za krótkie - hasło powinno składać się minimum z 12 znaków."
  )
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*@^])/,
    "Hasło powinno zawierać jedną duża litere, jedną małą, jedną cyfrę i jeden znak specjalny"
  )
  .required("Hasło jest wymagane");

export const passwordValidation = yup.string().required("Hasło jest wymagane");
