export const required = (input) => input.length > 0;

export const isNumber = (input) => !Number.isNaN(+input);

export const minLen = (input, len) => input.length >= len;

export const maxLen = (input, len) => input.length <= len;

export const match = (input, pattern) => pattern.test(input);

export const isInputValid = (input, validations) => {
  let isValid = true;

  if (validations.required) {
    isValid = isValid && required(input);
  }
  if (validations.isNumber) {
    isValid = isValid && isNumber(input);
  }
  if (validations.minLength) {
    isValid = isValid && minLen(input, validations.minLength);
  }
  if (validations.maxLength) {
    isValid = isValid && maxLen(input, validations.maxLength);
  }
  if (validations.pattern) {
    isValid = isValid && match(input, validations.pattern);
  }

  return isValid;
};
