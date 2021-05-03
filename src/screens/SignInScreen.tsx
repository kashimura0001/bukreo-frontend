import React, { FormEvent, useState, VFC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Redirect, useHistory } from "react-router-dom";
import { PasswordInput } from "../components/PasswordInput";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { PASSWORD_RESET_PATH, SIGN_UP_PATH, TEAMS_PATH } from "../config/routes";
import { UserAuthStatus } from "../utils/constants";

type Props = {};

export const SignInScreen: VFC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { status, signInEmail } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInEmail(email, password);
    await history.push(TEAMS_PATH);
  };

  if (status === UserAuthStatus.SignedIn) return <Redirect to={TEAMS_PATH} />;

  return (
    <Flex w="full" align="center" justifyContent="center">
      <Box w="320px" mt="120px">
        <Box textAlign="center">
          <Text fontSize="2xl">ログイン</Text>
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
            <Button type="submit" size="lg" colorScheme="blue" mt={12} width="full" variant="outline">
              ログイン
            </Button>
            <Box textAlign="center" mt={8}>
              <Button
                color="blue.500"
                variant="link"
                fontWeight={400}
                onClick={() => history.push(PASSWORD_RESET_PATH)}
              >
                パスワードをお忘れの方はこちら
              </Button>
            </Box>
            <Box textAlign="center" mt={4}>
              <Button color="blue.500" variant="link" fontWeight={400} onClick={() => history.push(SIGN_UP_PATH)}>
                未登録の方はこちら
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
