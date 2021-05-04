import React, { FC } from "react";
import { generatePath, Link } from "react-router-dom";
import { TIMELINE_PATH } from "../config/routes";
import { Box, Flex, Text } from "@chakra-ui/react";
import { TeamListRowFragment, UserRole } from "../graphql/schema";

const userRoleText = (role: UserRole) => {
  switch (role) {
    case UserRole.Admin:
      return "管理者";
    case UserRole.Member:
      return "メンバー";
  }
};

type Props = {
  member: TeamListRowFragment;
};

// TODO memberではなくてteamを直接取得できるようにAPIを修正する
export const TeamListRow: FC<Props> = ({ member }) => {
  return (
    <Link to={generatePath(TIMELINE_PATH, { teamId: member.team.id })}>
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
          {member.team.name}
        </Text>
        <Text ml="auto" fontSize="12px">
          {member.role ? userRoleText(member.role) : ""}
        </Text>
      </Flex>
    </Link>
  );
};
