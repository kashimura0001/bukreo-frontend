import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {};

export const LoadingScreen: FC<Props> = () => {
  return (
    <Flex
      w="100%"
      h={window.outerHeight * 0.8}
      alignItems="center"
      justifyContent="center"
    >
      <div>loading...</div>
    </Flex>
  );
};
