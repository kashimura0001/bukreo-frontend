import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  ONBOARDING_PATH,
  PASSWORD_RESET_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  TEAMS_PATH,
  TIMELINE_PATH,
} from "./config/routes";
import { SignUpScreen } from "./screens/SignUpScreen";
import { Auth } from "./components/Auth";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { PasswordResetScreen } from "./screens/PasswordResetScreen";
import { TeamsScreen } from "./screens/TeamsScreen";
import { useAuth } from "./hooks/useAuth";
import { UserAuthStatus } from "./utils/constants";
import { TimelineScreen } from "./screens/TimelineScreen";

function App() {
  const { status } = useAuth();

  if (status === UserAuthStatus.Unknown) return null;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={SIGN_UP_PATH} component={SignUpScreen} />
        <Route exact path={SIGN_IN_PATH} component={SignInScreen} />
        <Route exact path={ONBOARDING_PATH} component={OnboardingScreen} />
        <Route
          exact
          path={PASSWORD_RESET_PATH}
          component={PasswordResetScreen}
        />

        <Auth>
          <Route exact path={TEAMS_PATH} component={TeamsScreen} />
          <Route exact path={TIMELINE_PATH} component={TimelineScreen} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
