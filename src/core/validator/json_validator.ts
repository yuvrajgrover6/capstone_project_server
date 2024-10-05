import Ajv from "ajv";
import { BaseErrorException } from "../response_handlers/base_error_exception";

const ajv = new Ajv();
export const validateData = (schema: object, body: object) => {
  const validate = ajv.validate(schema, body);
  if (!validate) {
    const validationError = ajv.errorsText();
    throw new BaseErrorException({
      message: validationError,
      error: "invalid-data",
      logInfo: null,
      code: 400,
    });
  }
};
