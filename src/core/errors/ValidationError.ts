import { ValidationErrorItem } from "joi";

export default class ValidationError extends Error {
  public details: ValidationErrorItem[];

  constructor(message: string, details: ValidationErrorItem[]) {
    super(message);
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
