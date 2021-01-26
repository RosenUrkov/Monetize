import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isInputValid } from "../../../common/validators";
import Loader from "../../../components/UI/Loader/Loader";
import { authHideMessage, login } from "../../../store/actions/auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink, Redirect } from "react-router-dom";
import withToasts from "../../../hoc/withToasts";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const { showToast, history } = props;

  const classes = useStyles();

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

  useEffect(() => {
    if (auth.message) {
      showToast(auth.message, "success");
      dispatch(authHideMessage());
    }
  }, [dispatch, auth.message, showToast]);

  useEffect(() => {
    if (auth.error) {
      showToast(auth.error.message, "error");
      dispatch(authHideMessage());
    }
  }, [auth.error, dispatch, showToast]);

  if (auth.loading) return <Loader />;

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
    dispatch(
      login(loginForm.username.value, loginForm.password.value, () => {
        history.push("/balance");
      })
    );
  };

  const formElements = Object.keys(loginForm)
    .map((name) => ({ name, config: loginForm[name] }))
    .map(({ name, config }) => {
      const isValidClass = config.valid ? "valid" : "invalid";
      const isTouchedClass = config.touched ? "touched" : "untouched";
      const classes = [isValidClass, isTouchedClass].join(" ");

      return (
        <TextField
          required={config.validation?.required}
          variant="outlined"
          margin="normal"
          fullWidth
          label={config.placeholder}
          type={config.type}
          key={name}
          name={name}
          className={classes}
          value={config.value}
          onChange={handleInputChange}
        />
      );
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={loginHandler}>
          {formElements}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/register" variant="body2">
                Don't have an account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withToasts(Login);
