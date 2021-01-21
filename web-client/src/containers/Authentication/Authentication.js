import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import httpProvider from "../../providers/http-provider";
import "./Authentication.css";

const Authentication = () => {
  const [authMode, setAuthMode] = useState(true);
  const { setLoginState } = useContext(AuthContext);

  const [isFormValid, setIsFormValid] = useState(false);
  const [authForm, setAuthForm] = useState({
    username: {
      name: "username",
      placeholder: "username",
      value: "",
      type: "text",
      validation: {
        required: true,
        minLength: 3,
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
        minLength: 5,
        maxLength: 30,
      },
      valid: false,
      touched: false,
    },
  });

  const isInputValid = (input, validations) => {
    let isValid = true;

    if (validations.required) {
      isValid = isValid && input.length !== 0;
    }
    if (validations.minLength) {
      isValid = isValid && input.length >= validations.minLength;
    }
    if (validations.maxLength) {
      isValid = isValid && input.length <= validations.maxLength;
    }

    return isValid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedControl = { ...authForm[name] };

    updatedControl.value = value;
    updatedControl.touched = true;
    updatedControl.valid = isInputValid(value, updatedControl.validation);

    const updatedForm = { ...authForm, [name]: updatedControl };
    setAuthForm(updatedForm);

    const formValid = Object.values(updatedForm).every(
      (control) => control.valid
    );
    setIsFormValid(formValid);
  };

  const register = (ev) => {
    ev.preventDefault();

    const body = {
      username: authForm.username.value,
      password: authForm.password.value,
    };

    httpProvider.post("register", body).then(console.log);
  };

  const login = (ev) => {
    ev.preventDefault();

    const body = {
      username: authForm.username.value,
      password: authForm.password.value,
    };

    httpProvider
      .post("login", body)
      .then((data) => setLoginState(true, data.token))
      .catch(console.log);
  };

  const formElements = Object.keys(authForm)
    .map((name) => ({ name, config: authForm[name] }))
    .map(({ name, config }) => {
      const isValidClass = config.valid ? "valid" : "invalid";
      const isTouchedClass = config.touched ? "touched" : "untouched";
      const classes = [isValidClass, isTouchedClass].join(" ");

      return (
        <input
          type={config.type}
          key={name}
          name={name}
          className={classes}
          placeholder={config.placeholder}
          value={config.value}
          onChange={handleInputChange}
        />
      );
    });

  return (
    <form onSubmit={(ev) => (authMode ? register(ev) : login(ev))}>
      <h3>{authMode ? "Register" : "Login"}</h3>
      {formElements}
      <button type="submit" disabled={!isFormValid}>
        Submit!
      </button>
      <button type="button" onClick={() => setAuthMode(!authMode)}>
        Change to {authMode ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default Authentication;
