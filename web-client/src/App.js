import React, { Suspense, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import NotFound from "./components/Error/NotFound/NotFound";
import Login from "./containers/Authentication/Login/Login";
import Register from "./containers/Authentication/Register/Register";
import { authCheckState } from "./store/actions/auth";
import Layout from "./hoc/Layout";
import Loader from "./components/UI/Loader/Loader";

const Balance = React.lazy(() => import("./containers/Balance/Balance"));
const Budget = React.lazy(() => import("./containers/Budget/Budget"));
const Statistics = React.lazy(() =>
  import("./containers/Statistics/Statistics")
);

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  const authRoutes = (
    <Switch>
      <Redirect from="/" to="/balance" exact />
      {/* the redirect to login after logout is too fast */}
      <Redirect path="/login" to="/balance" />
      <Route path="/balance" render={(props) => <Balance {...props} />} />
      <Route path="/budgets" render={(props) => <Budget {...props} />} />
      <Route path="/statistics" render={(props) => <Statistics {...props} />} />

      <Route path="*" component={NotFound} />
    </Switch>
  );

  const anonRoutes = (
    <Switch>
      <Redirect from="/" to="/login" exact />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="*" component={Login} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loader />}>
          {auth.token ? authRoutes : anonRoutes}
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
