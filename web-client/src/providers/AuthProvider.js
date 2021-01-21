import { createContext } from "react";
import React, { useState } from "react";

export const AuthContext = createContext({
  logged: false,
  setLoginState: () => {},
});

const AuthProvider = (props) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  const setLoginState = (state, token = null) => {
    if (state) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    setIsLogged(state);
  };

  return (
    <>
      <AuthContext.Provider value={{ logged: isLogged, setLoginState }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
