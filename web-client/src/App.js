import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Authentication from "./containers/Authentication/Authentication";
import Balance from "./containers/Balance/Balance";
import Budget from "./containers/Budget/Budget";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/balance" exact />
          <Route path="/balance" component={Balance} />
          <Route path="/budget" component={Budget} />
          <Route path="/auth" component={Authentication} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
