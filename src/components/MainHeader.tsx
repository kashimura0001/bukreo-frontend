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

type Props = {
  avatarUrl: string;
};

export const MainHeader: FC<Props> = ({ avatarUrl }) => {
  return (
    <Flex p="2" h="60px" borderBottom="1px" borderColor="gray.300">
      <Box>
        <Heading size="lg">Bukreo</Heading>
      </Box>
      <Spacer />
      <Menu>
        <MenuButton as={Button} borderRadius="full" p="0">
          <Avatar boxSize="40px" src={avatarUrl || "https://bit.ly/broken-link"} />
        </MenuButton>
        <MenuList>
          <MenuItem>プロフィール</MenuItem>
          <MenuItem>チームリスト</MenuItem>
          <MenuDivider />
          <MenuItem color="red">ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
