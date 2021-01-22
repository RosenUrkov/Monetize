import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isInputValid } from "../../../common/validators";
import Error from "../../../components/Error/Error/Error";
import Loader from "../../../components/UI/Loader/Loader";
import { register } from "../../../store/actions/auth";
import "./Register.css";

const Register = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [registerForm, setRegisterForm] = useState({
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
  });

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  if (auth.loading) return <Loader />;
  if (auth.error) return <Error />;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedControl = { ...registerForm[name] };

    updatedControl.value = value;
    updatedControl.touched = true;
    updatedControl.valid = isInputValid(value, updatedControl.validation);

    const updatedForm = { ...registerForm, [name]: updatedControl };
    setRegisterForm(updatedForm);

    const formValid = Object.values(updatedForm).every(
      (control) => control.valid
    );
    setIsFormValid(formValid);
  };

  const registerHandler = (ev) => {
    ev.preventDefault();
    dispatch(
      register(registerForm.username.value, registerForm.password.value)
    );
  };

  const formElements = Object.keys(registerForm)
    .map((name) => ({ name, config: registerForm[name] }))
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
    <form onSubmit={registerHandler}>
      <h3>Register</h3>
      {formElements}
      <button type="submit" disabled={!isFormValid}>
        Submit!
      </button>
    </form>
  );
};

export default Register;
