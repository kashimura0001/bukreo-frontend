import React, { FC } from "react";
import { TeamListFragment, UserRole } from "../graphql/schema";
import { Box, Flex, Text, SimpleGrid, Icon } from "@chakra-ui/react";
import { generatePath, Link } from "react-router-dom";
import { TIMELINE_PATH } from "../config/routes";
import ContentLoader from "react-content-loader";

const TeamListContentLoader: FC = () => {
  return (
    <Box width="100%">
      <ContentLoader width="100%" height="100">
        <rect x="0" y="0" width="100%" height="100" />
      </ContentLoader>
    </Box>
  );
};

const userRoleText = (role: UserRole) => {
  switch (role) {
    case UserRole.Admin:
      return "管理者";
    case UserRole.Member:
      return "メンバー";
  }
};

type Props = {
  members: TeamListFragment[];
};

export const TeamList: FC<Props> = ({ members }) => {
  if (!members) {
    return <TeamListContentLoader />;
  }

  return (
    <SimpleGrid spacing="30px">
      {members.map(({ id, role, team }) => (
        <Link key={id} to={generatePath(TIMELINE_PATH, { teamId: team.id })}>
          <Flex
            w="100%"
            h="100px"
            p="20px"
            border="1px"
            borderRadius="10px"
            borderColor="gray.300"
            alignItems="center"
            _hover={{ backgroundColor: "gray.100" }}
          >
            {/* TODO チームアイコンを設定できるようにする */}
            <Box borderRadius="50%" backgroundColor="gray.200" w="45px" h="45px" />
            <Text ml="20px" fontWeight="bold" overflow="hidden" isTruncated>
              {team.name}
            </Text>
            <Text ml="auto" fontSize="12px">
              {role ? userRoleText(role) : ""}
            </Text>
          </Flex>
        </Link>
      ))}
    </SimpleGrid>
  );
};
