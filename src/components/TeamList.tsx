import React, { FC } from "react";
import { TeamListFragment } from "../graphql/schema";

type Props = {
  members: TeamListFragment[];
};

export const TeamList: FC<Props> = ({ members }) => {
  return (
    <>
      {members.map(({ id, role, team }) => (
        <div key={id}>{team.name}</div>
      ))}
    </>
  );
};
