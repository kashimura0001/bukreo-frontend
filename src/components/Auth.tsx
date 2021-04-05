import React, { VFC, ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { ONBOARDING_PATH, SIGN_IN_PATH } from "../config/routes";
import { gql } from "@apollo/client/core";
import { useLazyQuery, useQuery } from "@apollo/client";

const FetchCurrentUserQuery = gql`
  query FetchCurrentUserQuery {
    currentUser {
      id
    }
  }
`;

type Props = {
  children: ReactNode;
};

// TODO APIとの繋ぎ込み、認証の動作確認
export const Auth: VFC<Props> = ({ children }) => {
  const { loading, user } = useAuth();
  const [fetchCurrentUser, { data, error }] = useLazyQuery(
    FetchCurrentUserQuery
  );
  const history = useHistory();

  useEffect(() => {
    if (user) fetchCurrentUser();
  }, [fetchCurrentUser, user]);

  if (error) {
    console.log(error);
    return <div>Error...</div>;
  }

  // TODO loadingページを追加する
  if (loading || !data) return <div>認証中...</div>;

  if (!user) {
    history.push(SIGN_IN_PATH);
    return null;
  }

  if (!data.currentUser) {
    history.push(ONBOARDING_PATH);
    return null;
  }

  return <>{children}</>;
};
