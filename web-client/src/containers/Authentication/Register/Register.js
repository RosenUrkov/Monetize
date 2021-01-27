import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { isInputValid } from "../../../common/validators";
import Loader from "../../../components/UI/Loader/Loader";
import { authHideMessage, register } from "../../../store/actions/auth";
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
import withToasts from "../../../hoc/withToasts";
import { registerFormElements } from "../../../constants/registerFormElements";

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

const Register = (props) => {
  const { showToast, history } = props;

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const classes = useStyles();

  const [isFormValid, setIsFormValid] = useState(false);
  const [registerForm, setRegisterForm] = useState(registerFormElements);

  useEffect(() => {
    if (auth.error) {
      showToast(auth.error.message, "error");
      dispatch(authHideMessage());
    }
  }, [auth.error, dispatch, showToast]);

  if (auth.loading) return <Loader />;

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
      register(registerForm.username.value, registerForm.password.value, () =>
        history.push("/login")
      )
    );
  };

  const formElements = Object.keys(registerForm)
    .map((name) => ({ name, config: registerForm[name] }))
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
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={registerHandler}>
          {formElements}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/login" variant="body2">
                Already have an account? Sign In
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withToasts(Register);
