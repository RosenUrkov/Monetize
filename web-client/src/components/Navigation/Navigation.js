import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/actions/auth";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const logoutHandler = () => dispatch(logout());

  return (
    <div className="Navbar">
      {auth.token && <NavLink to="/balance">Balance</NavLink>}
      {auth.token && <NavLink to="/budget">Budget</NavLink>}
      {!auth.token && <NavLink to="/register">Register</NavLink>}
      {!auth.token && <NavLink to="/login">Login</NavLink>}
      {auth.token && <button onClick={logoutHandler}>Logout</button>}
    </div>
  );
};

export default Navigation;
