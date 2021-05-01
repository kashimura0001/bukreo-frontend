import React, { FC } from "react";
import { TeamListFragment, UserRole } from "../graphql/schema";
import { Box, Flex, Text, Heading, SimpleGrid } from "@chakra-ui/react";
import { generatePath, Link } from "react-router-dom";
import { TIMELINE_PATH } from "../config/routes";

type Props = {
  members: TeamListFragment[];
};

export const TeamList: FC<Props> = ({ members }) => {
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
