import React, { VFC, useState, FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { PasswordInput } from "../components/PasswordInput";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import {
  ONBOARDING_PATH,
  PASSWORD_RESET_PATH,
  SIGN_UP_PATH,
} from "../config/routes";

type Props = {};

export const SignInScreen: VFC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { signInEmail } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInEmail(email, password);
    // TODO: サインインの処理を書く、遷移先を変更する
    await history.push(ONBOARDING_PATH);
  };

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
            <Button
              type="submit"
              size="lg"
              colorScheme="blue"
              mt={12}
              width="full"
              variant="outline"
            >
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
              <Button
                color="blue.500"
                variant="link"
                fontWeight={400}
                onClick={() => history.push(SIGN_UP_PATH)}
              >
                未登録の方はこちら
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
