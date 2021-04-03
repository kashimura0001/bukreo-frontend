import React, { VFC, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { SIGN_IN_PATH } from "../config/routes";

type Props = {
  children: ReactNode;
};

export const Auth: VFC<Props> = ({ children }) => {
  // TODO オンボーディングが完了しているか確認する処理を入れる
  const { loading, user } = useAuth();

  const history = useHistory();

  // TODO: ローディングページを追加する
  if (loading) return <div>...loading</div>;

  if (!user) {
    history.push(SIGN_IN_PATH);
    return null;
  }

  return <>{children}</>;
};
