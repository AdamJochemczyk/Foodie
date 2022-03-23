import * as yup from "yup";
import { categories } from "../constants/categories";
import { recipeTypes } from "../constants/recipeType";

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
  .min(8, "Gtin code musi mieć co najmniej 8 cyfr")
  .max(14, "Gtin code musi mieć maksymalnie 14 cyfr")
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
  gtincode: gtinCodeValidation,
  photo: fileValidation,
  category: categoryValidation
});

export const productAddValidation = yup.object().shape({
  name: yup.string().required("Nazwa jest wymagana"),
  gtincode: gtinCodeValidation,
  category: categoryValidation
});

export const searchRecipeValidation = yup.object().shape({
  title: yup.string(),
  recipetype: yup.string().oneOf(recipeTypes.map(recipe => recipe.value)),
  mealportions: yup.number().positive("Liczba porcji nie może być ujemna"),
  kcalperportionfrom: yup.number().positive("Liczba kcal nie może być ujemna"),
  kcalperportionto: yup
    .number()
    .positive("Liczba kcal nie może być ujemna")
    .moreThan(
      yup.ref("kcalPerPortionFrom"),
      "Kcal na porcję max powinno być większe niż kcal min"
    ),
  isvegan: yup.boolean(),
  isvegetarian: yup.boolean()
});

export const recipeValidation = yup.object().shape({
  title: yup.string().required("Tytuł jest wymagany"),
  description: yup
    .string()
    .required("Opis jest wymagany")
    .max(2100, "Opis moze mieć max 2100 znaków"),
  recipetype: yup
    .string()
    .oneOf(recipeTypes.map(recipe => recipe.value))
    .required("Typ posiłku jest wymagany"),
  mealportions: yup
    .number()
    .positive("Liczba porcji nie może być ujemna")
    .required("Liczba porcji jest"),
  kcalperportion: yup
    .number()
    .positive("Liczba kcal musi być dodatania")
    .required("Liczba kcal na porcję jest wymagana"),
  isvegan: yup.boolean(),
  isvegetarian: yup.boolean()
});

export const addRecipeValidation = recipeValidation.shape({
  photo: fileValidation
});
