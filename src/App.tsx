import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import "./App.css";
import {
  ONBOARDING_PATH,
  PASSWORD_RESET_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "./config/routes";
import { SignUpScreen } from "./screens/SignUpScreen";
import { Auth } from "./components/Auth";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { PasswordResetScreen } from "./screens/PasswordResetScreen";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={SIGN_UP_PATH} component={SignUpScreen} />
        <Route exact path={SIGN_IN_PATH} component={SignInScreen} />
        <Route
          exact
          path={PASSWORD_RESET_PATH}
          component={PasswordResetScreen}
        />
        <Auth>
          <Route exact path={ONBOARDING_PATH} component={OnboardingScreen} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
