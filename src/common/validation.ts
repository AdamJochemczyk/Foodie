import * as yup from "yup";
import { categories } from "./Inputs/Select/categories";

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

export const categoryValidation = yup
  .string()
  .oneOf(categories.map(category => category.value))
  .required("Prosze wybierz kategorie");

export const gtinCodeValidation = yup
  .string()
  .matches(/^\d+$/, "Gtin code musi składać się z cyfr")
  .min(14, "Gtin code musi mieć dokładnie 14 cyfr")
  .max(14, "Gtin code musi mieć dokładnie 14 cyfr")
  .required("Kod jest wymagany");

const SUPPORTED_FORMATS = new Set(["image/jpg", "image/jpeg", "image/png"]);
const FILE_SIZE = 1024 * 1024 * 2;

export const fileValidation = yup
  .mixed()
  .required("Plik jest wymagany")
  .test(
    "fileSize",
    "Plik jest za duzy",
    value => value && value.size <= FILE_SIZE
  )
  .test(
    "fileFormat",
    "Format pliku jest nieobslugiwany",
    value => value && SUPPORTED_FORMATS.has(value.type)
  );

export const productAddValidationWithPhoto = yup.object().shape({
  name: yup.string().required("Nazwa jest wymagana"),
  gtin_code: gtinCodeValidation,
  photo: fileValidation,
  category: categoryValidation
});

export const productAddValidation = yup.object().shape({
  name: yup.string().required("Nazwa jest wymagana"),
  gtin_code: gtinCodeValidation,
  category: categoryValidation
});
