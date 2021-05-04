import React, { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Redirect } from "react-router-dom";
import { ONBOARDING_PATH, SIGN_IN_PATH } from "../config/routes";
import { UserAuthStatus } from "../utils/constants";
import { LoadingScreen } from "../screens/LoadingScreen";
import { useCurrentUser } from "../hooks/useCurrentUser";

const Unauthorized = 401;

type Props = {};

export const Auth: FC<Props> = ({ children }) => {
  const { status } = useAuth();
  const { currentUser, fetched, error } = useCurrentUser();

  if (!fetched) {
    return <LoadingScreen />;
  }

  if (status === UserAuthStatus.SignedOut) {
    return <Redirect to={SIGN_IN_PATH} />;
  }

  if (error) {
    const isUnauthorizedError = error.graphQLErrors.some((e) => {
      return e.extensions?.exception?.status === Unauthorized;
    });

    if (isUnauthorizedError) {
      return <Redirect to={ONBOARDING_PATH} />;
    }
  }

  if (!currentUser) {
    // TODO 通信エラーであることをトーストに表示する
    return <Redirect to={SIGN_IN_PATH} />;
  }

  return <>{children}</>;
};
