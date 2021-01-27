export const registerFormElements = {
  username: {
    name: "username",
    placeholder: "username",
    value: "",
    type: "text",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    valid: false,
    touched: false,
  },
  password: {
    name: "password",
    placeholder: "password",
    value: "",
    type: "password",
    validation: {
      required: true,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
    },
    valid: false,
    touched: false,
  },
};
