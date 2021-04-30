import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { TeamsScreenDocument } from "../graphql/schema";
import { MainHeader } from "../components/MainHeader";
import { TeamListHeader } from "../components/TeamListHeader";
import { TeamList } from "../components/TeamList";

type Props = {};

export const TeamsScreen: FC<Props> = () => {
  const { data, error } = useQuery(TeamsScreenDocument);

  if (error) throw error;
  if (!data) return <div>teams fetching...</div>;

  return (
    <div>
      <MainHeader currentUser={data.currentUser} />
      <TeamListHeader />
      <TeamList members={data.currentUser.members} />
    </div>
  );
};
