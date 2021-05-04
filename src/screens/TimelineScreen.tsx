import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";

type Props = {};

export const TimelineScreen: FC<Props> = () => {
  const { teamId } = useParams<{ teamId: string }>();
  return (
    <>
      <MainHeader />
      <div>TimelineScreen: {teamId}</div>
    </>
  );
};
