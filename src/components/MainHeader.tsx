import React, { FC } from "react";
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
import { useParams, useHistory } from "react-router-dom";
import { TEAMS_PATH } from "../config/routes";
type Props = {
  avatarUrl: string;
};

export const MainHeader: FC<Props> = ({ avatarUrl }) => {
  const { teamId }: { teamId: string } = useParams();
  const history = useHistory();

  return (
    <Flex p="2" h="60px" borderBottom="1px" borderColor="gray.300">
      <Box>
        <Heading size="lg">Bukreo</Heading>
      </Box>
      <Spacer />
      <Menu>
        <MenuButton as={Button} borderRadius="full" p="0">
          <Avatar boxSize="40px" src={avatarUrl || ""} />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiUser />}>プロフィール</MenuItem>
          {teamId && (
            <>
              <MenuDivider />
              <MenuItem icon={<FiSettings />}>チーム設定</MenuItem>
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
};
