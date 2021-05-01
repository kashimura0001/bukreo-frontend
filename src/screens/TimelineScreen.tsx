import React, { FC } from "react";
import { useParams } from "react-router-dom";

type Props = {};

export const TimelineScreen: FC<Props> = () => {
  const { teamId } = useParams<{ teamId: string }>();
  return <div>TimelineScreen: {teamId}</div>;
};
