import React, { FC, memo } from "react";
import {
  Flex,
  Box,
  HStack,
  Heading,
  Spacer,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { FiUser, FiSettings, FiList, FiLogOut } from "react-icons/fi";
import { useParams, useHistory, generatePath, Link } from "react-router-dom";
import { MEMBERS_PATH, TEAM_SETTING_PATH, TEAMS_PATH, TIMELINE_PATH } from "../config/routes";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { colors } from "../constants/color";

type Props = {};

export const MainHeader: FC<Props> = memo(() => {
  const { teamId }: { teamId: string } = useParams();
  const { currentUser } = useCurrentUser();
  const history = useHistory();

  return (
    <Flex p="2" h="60px" backgroundColor={colors.pallets.white} boxShadow="md">
      <HStack spacing="40px">
        <Heading size="lg">Bukreo</Heading>
        {teamId && (
          <>
            <Link to={generatePath(TIMELINE_PATH, { teamId: teamId })}>
              <Box _hover={{ fontWeight: "bold" }}>タイムライン</Box>
            </Link>
            <Link to={generatePath(MEMBERS_PATH, { teamId: teamId })}>
              <Box _hover={{ fontWeight: "bold" }}>メンバー</Box>
            </Link>
          </>
        )}
      </HStack>
      <Spacer />
      <Menu>
        <MenuButton as={Button} borderRadius="full" p="0">
          <Avatar
            name={currentUser?.name}
            backgroundColor={colors.semantics.defaultIconBackground}
            boxSize="40px"
            src={currentUser?.avatarUrl || ""}
          />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiUser />}>プロフィール</MenuItem>
          {teamId && (
            <>
              <MenuDivider />
              <MenuItem
                icon={<FiSettings />}
                onClick={() => history.push(generatePath(TEAM_SETTING_PATH, { teamId: teamId }))}
              >
                チーム設定
              </MenuItem>
              <MenuItem icon={<FiList />} onClick={() => history.push(TEAMS_PATH)}>
                チームリスト
              </MenuItem>
            </>
          )}
          <MenuDivider />
          <MenuItem icon={<FiLogOut />} color={colors.semantics.dangerText}>
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
});
