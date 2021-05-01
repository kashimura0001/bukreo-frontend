import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { TeamsScreenDocument } from "../graphql/schema";
import { MainHeader } from "../components/MainHeader";
import { TeamListHeader } from "../components/TeamListHeader";
import { TeamList } from "../components/TeamList";
import { Box, Flex } from "@chakra-ui/react";

type Props = {};

export const TeamsScreen: FC<Props> = () => {
  const { data, error } = useQuery(TeamsScreenDocument);

  if (error) throw error;
  if (!data) return <div>teams fetching...</div>;

  return (
    <Box>
      <MainHeader currentUser={data.currentUser} />
      <Flex w="full" justifyContent="center" mt="100px">
        <Box w="900px">
          <TeamListHeader />
          <Box mt="30px">
            {/* TODO userからteamsを引けるようにapiを修正する */}
            <TeamList members={data.currentUser.members} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
