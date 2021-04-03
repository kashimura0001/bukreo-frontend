import React, { VFC, useState, FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { SIGN_IN_PATH } from "../config/routes";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Box, Button, Text } from "@chakra-ui/react";

export const OnboardingScreen: VFC = () => {
  const [name, setName] = useState("");

  const history = useHistory();
  const { signOut } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: プロフィール登録処理を実装する

    // TODO 消す
    signOut();
  };

  return (
    <Flex w="full" align="center" justifyContent="center">
      <Box w="320px" mt="120px">
        <Box textAlign="center">
          <Text fontSize="2xl">Welcome!</Text>
        </Box>
        <Box mt={10} textAlign="left" w="100%">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel fontSize="sm">名前</FormLabel>
              <Input
                size="lg"
                placeholder="名前"
                value={name}
                onChange={(e) => setName(e.target.value)}
                backgroundColor="gray.100"
              />
            </FormControl>
            <Button
              type="submit"
              size="lg"
              colorScheme="blue"
              mt={12}
              width="full"
              variant="outline"
            >
              登録する
            </Button>
            <Box textAlign="center" mt={8}>
              <Button
                color="blue.500"
                variant="link"
                fontWeight={400}
                onClick={() => history.push(SIGN_IN_PATH)}
              >
                ログイン画面へ戻る
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
