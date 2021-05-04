import { useRecoilState } from "recoil";
import { CurrentUserState } from "../states/CurrentUserState";
import { useEffect, useState } from "react";
import { useCurrentUserLazyQuery } from "../graphql/schema";

export const useCurrentUser = () => {
  const [fetched, setFetched] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserState);
  const [getCurrentUser, { data, called, error }] = useCurrentUserLazyQuery();

  useEffect(() => {
    if (currentUser) {
      setFetched(true);
      return;
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!called) return;

    if (data?.currentUser) {
      setCurrentUser(data.currentUser);
    } else {
      setCurrentUser(null);
    }
    setFetched(true);
  }, [data]);

  return { currentUser, fetched, error };
};
