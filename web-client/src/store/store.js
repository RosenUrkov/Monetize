import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./reducers/auth";
import paymentsReducer from "./reducers/payments";
import budgetsReducer from "./reducers/budgets";
import statisticsReducer from "./reducers/statistics";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    auth: authReducer,
    payments: paymentsReducer,
    budgets: budgetsReducer,
    statistics: statisticsReducer,
  }),
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
