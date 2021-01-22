import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isInputValid } from "../../../common/validators";
import Loader from "../../../components/UI/Loader/Loader";
import Error from "../../../components/Error/Error/Error";
import { login } from "../../../store/actions/auth";
import "./Login.css";

const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: {
      name: "username",
      placeholder: "username",
      value: "",
      type: "text",
      validation: {
        required: true,
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
    const updatedControl = { ...loginForm[name] };

    updatedControl.value = value;
    updatedControl.touched = true;
    updatedControl.valid = isInputValid(value, updatedControl.validation);

    const updatedForm = { ...loginForm, [name]: updatedControl };
    setLoginForm(updatedForm);

    const formValid = Object.values(updatedForm).every(
      (control) => control.valid
    );
    setIsFormValid(formValid);
  };

  const loginHandler = (ev) => {
    ev.preventDefault();
    dispatch(login(loginForm.username.value, loginForm.password.value));
  };

  const formElements = Object.keys(loginForm)
    .map((name) => ({ name, config: loginForm[name] }))
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
    <form onSubmit={loginHandler}>
      <h3>Login</h3>
      {formElements}
      <button type="submit" disabled={!isFormValid}>
        Submit!
      </button>
    </form>
  );
};

export default Login;
