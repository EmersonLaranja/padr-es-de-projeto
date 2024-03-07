import DateValidatorAdapter from "../dateValidatorAdapter";
import { Validation } from "../interfaces/validation";
import { DateValidation } from "../validation/dateValidation";
import { RequiredFieldsValidation } from "../validation/requiredFieldsValidation";
import { ValidationComposite } from "../validation/validationComposite";

export const addTaskValidationCompositeFactory = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ["title", "description", "date"]) {
    validations.push(new RequiredFieldsValidation(field));
  }

  validations.push(new DateValidation("date", new DateValidatorAdapter()));

  return new ValidationComposite(validations);
};
