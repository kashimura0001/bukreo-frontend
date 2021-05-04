import { useCurrentUserQuery } from "../graphql/schema";

export const useCurrentUser = () => {
  const { data, loading, error } = useCurrentUserQuery();
  return { currentUser: data?.currentUser, loading, error };
};
