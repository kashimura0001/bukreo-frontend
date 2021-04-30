import React, { FC } from "react";
import { User } from "../graphql/schema";
import { Flex, Box, Heading, Spacer, Button, Avatar } from "@chakra-ui/react";

type Props = {
  currentUser: User;
};

export const MainHeader: FC<Props> = ({ currentUser }) => {
  const handleClickIcon = () => {
    // TODO アイコンを押下したときの処理を実装する
    alert("hogehoge");
  };

  return (
    <Flex p="2" h="60px" borderBottom="1px" borderColor="gray.300">
      <Box>
        <Heading size="lg">Bukreo</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button borderRadius="full" p="0" onClick={handleClickIcon}>
          <Avatar
            boxSize="40px"
            src={currentUser?.avatarUrl || "https://bit.ly/broken-link"}
          />
        </Button>
      </Box>
    </Flex>
  );
};
