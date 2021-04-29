import React, { VFC, useState, FormEvent } from "react";
import firebase from "firebase";
import { Redirect, useHistory } from "react-router-dom";
import { SIGN_IN_PATH, TEAMS_PATH } from "../config/routes";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useAuth } from "../hooks/useAuth";
import { UserAuthStatus } from "../utils/constants";
import { CreateUserDocument } from "../graphql/schema";

export const OnboardingScreen: VFC = () => {
  const [name, setName] = useState("");

  const history = useHistory();
  const { status } = useAuth();
  const [createUser] = useMutation(CreateUserDocument);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const firebaseUser = firebase.auth().currentUser;
    if (!firebaseUser) throw new Error("Not signed in.");

    const firebaseIdToken = await firebaseUser.getIdToken(true);
    const email = firebaseUser.email;

    await createUser({ variables: { firebaseIdToken, name, email } })
      .then(() => {
        firebaseUser.sendEmailVerification();
        history.push(TEAMS_PATH);
      })
      .catch((e) => console.log(e));
  };

  if (status === UserAuthStatus.SignedOut) {
    return <Redirect to={SIGN_IN_PATH} />;
  }

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
