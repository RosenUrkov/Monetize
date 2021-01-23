import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import NotFound from "./components/Error/NotFound/NotFound";
import Login from "./containers/Authentication/Login/Login";
import Register from "./containers/Authentication/Register/Register";
import Balance from "./containers/Balance/Balance";
import Budget from "./containers/Budget/Budget";
import { authCheckState } from "./store/actions/auth";
import Layout from "./hoc/Layout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect from="/" to="/register" exact />

          <Route path="/balance" component={Balance} />
          <Route path="/budgets" component={Budget} />

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
