import React, { FormEvent, useState, VFC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Redirect, useHistory } from "react-router-dom";
import { ONBOARDING_PATH, SIGN_IN_PATH, TEAMS_PATH } from "../config/routes";
import { PasswordInput } from "../components/PasswordInput";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { UserAuthStatus } from "../utils/constants";

type Props = {};

export const SignUpScreen: VFC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { status, signUpEmail } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signUpEmail(email, password);
    await history.push(ONBOARDING_PATH);
  };

  if (status === UserAuthStatus.SignedIn) return <Redirect to={TEAMS_PATH} />;

  return (
    <Flex w="full" align="center" justifyContent="center">
      <Box w="320px" mt="120px">
        <Box textAlign="center">
          <Text fontSize="2xl">アカウント登録</Text>
        </Box>
        <Box mt={10} textAlign="left" w="100%">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel fontSize="sm">メールアドレス</FormLabel>
              <Input
                type="email"
                size="lg"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                backgroundColor="gray.100"
              />
            </FormControl>
            <FormControl isRequired mt={8}>
              <FormLabel fontSize="sm">パスワード</FormLabel>
              <PasswordInput
                placeholder="パスワード"
                size="lg"
                value={password}
                backgroundColor="gray.100"
                onChange={(e) => setPassword(e.target.value)}
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
                アカウントをお持ちの方はこちら
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
