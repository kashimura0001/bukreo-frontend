import React, { FC, memo } from "react";
import {
  Flex,
  Box,
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
import { useParams, useHistory, generatePath } from "react-router-dom";
import { TEAM_SETTING_PATH, TEAMS_PATH } from "../config/routes";
import { useCurrentUser } from "../hooks/useCurrentUser";

type Props = {};

export const MainHeader: FC<Props> = memo(() => {
  const { teamId }: { teamId: string } = useParams();
  const { currentUser } = useCurrentUser();
  const history = useHistory();

  return (
    <Flex p="2" h="60px" borderBottom="1px" borderColor="gray.300">
      <Box>
        <Heading size="lg">Bukreo</Heading>
      </Box>
      <Spacer />
      <Menu>
        <MenuButton as={Button} borderRadius="full" p="0">
          <Avatar boxSize="40px" src={currentUser?.avatarUrl || ""} />
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
          <MenuItem icon={<FiLogOut />} color="red">
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
});
