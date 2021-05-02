import React, { FC } from "react";
import { TeamListFragment, UserRole } from "../graphql/schema";
import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { generatePath, Link } from "react-router-dom";
import { TIMELINE_PATH } from "../config/routes";
import ContentLoader from "react-content-loader";

const TeamListContentLoader: FC = () => {
  return (
    <Box width="100%">
      <ContentLoader width="100%" height="100">
        <rect x="0" y="0" width="260" height="100" />
        <rect x="320" y="0" width="260" height="100" />
        <rect x="640" y="0" width="260" height="100" />
      </ContentLoader>
    </Box>
  );
};

type Props = {
  members: TeamListFragment[];
};

export const TeamList: FC<Props> = ({ members }) => {
  if (!members) {
    return <TeamListContentLoader />;
  }

  return (
    <SimpleGrid columns={3} spacing="60px">
      {members.map(({ id, role, team }) => (
        <Link key={id} to={generatePath(TIMELINE_PATH, { teamId: team.id })}>
          <Box
            h="100px"
            p="20px"
            boxShadow="md"
            border="1px"
            borderRadius="10px"
            borderColor="gray.400"
            _hover={{ backgroundColor: "gray.50" }}
          >
            <Text h="50px" overflow="hidden" fontWeight="bold">
              {team.name}
            </Text>
            {role === UserRole.Admin && (
              <Flex justifyContent="flex-end">
                <Text mt="5px" fontSize="13px">
                  管理者
                </Text>
              </Flex>
            )}
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  );
};
