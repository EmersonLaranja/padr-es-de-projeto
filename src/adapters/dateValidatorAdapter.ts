import { DateValidator } from "./interfaces/dateValidator";
import validator from "validator";

export default class DateValidatorAdapter implements DateValidator {
  isValid(date: string): boolean {
    return validator.isDate(date, { format: "DD/MM/YYYY" });
  }
}
