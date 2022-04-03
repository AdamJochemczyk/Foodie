import * as yup from "yup";
import { categories } from "../constants/categories";
import { recipeTypes } from "../constants/recipeType";

const isRequired = "is required";

export const emailValidation = yup
  .string()
  .email("Email must contains @ character")
  .required(`Email ${isRequired}`);

export const createPasswordValidation = yup
  .string()
  .min(
    12,
    "Password is too short - password should be longer than 12 characters"
  )
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*@^])/,
    "Password should contain one uppercase letter, one lowercase letter, one number and one special character"
  )
  .required(`Password  ${isRequired}`);

export const passwordValidation = yup
  .string()
  .required(`Password ${isRequired}`);

export const categoryValidation = yup
  .string()
  .oneOf(categories.map(category => category.value))
  .required("Please choose category");

export const gtinCodeValidation = yup
  .string()
  .matches(/^\d+$/, "Gtin code must be composed of digits")
  .min(8, "Gtin code should be longer than 8 digits")
  .max(14, "Gtin code may have up to 14 digits")
  .required(`Code ${isRequired}`);

const SUPPORTED_FORMATS = new Set(["image/jpg", "image/jpeg", "image/png"]);
const FILE_SIZE = 1024 * 1024 * 2;

export const fileValidation = yup
  .mixed()
  .required(`File  ${isRequired}`)
  .test(
    "fileSize",
    "File is too big",
    value => value && value.size <= FILE_SIZE
  )
  .test(
    "fileFormat",
    "This file format is unsupported yet",
    value => value && SUPPORTED_FORMATS.has(value.type)
  );

export const productAddValidationWithPhoto = yup.object().shape({
  name: yup.string().required(`Name ${isRequired}`),
  gtincode: gtinCodeValidation,
  photo: fileValidation,
  category: categoryValidation
});

export const productAddValidation = yup.object().shape({
  name: yup.string().required(`Name  ${isRequired}`),
  gtincode: gtinCodeValidation,
  category: categoryValidation
});

export const searchRecipeValidation = yup.object().shape({
  title: yup.string(),
  recipetype: yup.string().oneOf(recipeTypes.map(recipe => recipe.value)),
  mealportions: yup.number().positive("Meal portions cannot be negative"),
  kcalperportionfrom: yup.number().positive("Kcal number cannot be negative"),
  kcalperportionto: yup
    .number()
    .positive("Kcal number cannot be negative")
    .moreThan(
      yup.ref("kcalPerPortionFrom"),
      "Kcal per portion max should be grater than kcal min"
    ),
  isvegan: yup.boolean(),
  isvegetarian: yup.boolean()
});

export const recipeValidation = yup.object().shape({
  title: yup.string().required(`Title ${isRequired}`),
  description: yup
    .string()
    .required(`Description ${isRequired}`)
    .max(2100, "Description cannot be longer than 2100 characters"),
  recipetype: yup
    .string()
    .oneOf(recipeTypes.map(recipe => recipe.value))
    .required(`Recipe type ${isRequired}`),
  mealportions: yup
    .number()
    .positive("Meal portions cannot be negative")
    .required(`Meal portions ${isRequired}`),
  kcalperportion: yup
    .number()
    .positive("Kcal number per portion cannot be negative")
    .required(`Kcal number per portion ${isRequired}`),
  isvegan: yup.boolean(),
  isvegetarian: yup.boolean()
});

export const addRecipeValidation = recipeValidation.shape({
  photo: fileValidation
});

export const repeatPasswordSchema = yup.object().shape({
  password: createPasswordValidation,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must be same")
});
