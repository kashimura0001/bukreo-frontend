import React, { FC } from "react";
import { Flex, Text, Spacer, Button } from "@chakra-ui/react";

type Props = {};

export const TeamListHeader: FC<Props> = () => {
  return (
    <Flex align="center">
      <Text>チームリスト</Text>
      <Spacer />
      <Button type="submit" colorScheme="blue" variant="outline">
        チームを作成する
      </Button>
    </Flex>
  );
};
