import React, { FC } from "react";
import { Flex, Text, Spacer, Button } from "@chakra-ui/react";

type Props = {
  onCreateTeamButton: () => void;
};

export const TeamListHeader: FC<Props> = ({ onCreateTeamButton }) => {
  return (
    <Flex align="center">
      <Text>チームリスト</Text>
      <Spacer />
      <Button
        type="submit"
        colorScheme="blue"
        variant="outline"
        onClick={onCreateTeamButton}
      >
        チームを作成する
      </Button>
    </Flex>
  );
};
