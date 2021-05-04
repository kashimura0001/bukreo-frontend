import { atom } from "recoil";
import { User } from "../graphql/schema";

export const CurrentUserState = atom<User | null>({
  key: "CurrentUserState",
  default: null,
});
