import DateValidatorAdapter from "../dateValidatorAdapter";
import { Validation } from "../interfaces/validation";
import { DateValidation } from "./dateValidation";
import { RequiredFieldsValidation } from "./requiredFieldsValidation";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}
  validate(data: any): Error | void {
    for (const validation of this.validations) {
      const error = validation.validate(data);
      if (error) {
        return error;
      }
    }
  }
}

const taskValidationCompositeFactory = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ["title", "description", "date"]) {
    validations.push(new RequiredFieldsValidation(field));
  }

  validations.push(new DateValidation("date", new DateValidatorAdapter()));

  return new ValidationComposite(validations);
};
