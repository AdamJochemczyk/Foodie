import * as yup from "yup";
import { add, sub } from "date-fns";
import { DietSearch } from "./types";

export const dietDatesValidation = (values: DietSearch) => {
  return yup.object().shape({
    startDate: yup
      .date()
      .required("Start date is required")
      .min(sub(new Date(), { days: 1 }), "Cannot be earlier than today"),
    endDate: yup
      .date()
      .required("End date is required")
      .min(new Date(values.startDate), "Cannot be earlier than start date")
      .max(
        add(new Date(values.startDate), { days: 7 }),
        "Cannot be later than one week from today"
      )
  });
};
