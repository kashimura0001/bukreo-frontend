import React, { FC, useEffect, useState } from "react";
import { MainHeader } from "../components/MainHeader";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Button, Input, FormLabel } from "@chakra-ui/react";
import { TeamListRowFragmentDoc, useTeamSettingScreenQuery, useUpdateTeamMutation } from "../graphql/schema";
import { useParams } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { LoadingScreen } from "./LoadingScreen";

type Props = {};

export const TeamSettingScreen: FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const { teamId } = useParams<{ teamId: string }>();
  const { data } = useTeamSettingScreenQuery({ variables: { teamId } });
  const [updateTeam] = useUpdateTeamMutation({
    variables: { teamId, name: teamName },
    update(cache, { data }) {
      if (!data) return;
      cache.writeFragment({
        id: cache.identify(data.updateTeam),
        fragment: TeamListRowFragmentDoc,
        data: { name: data.updateTeam.name },
      });
    },
  });
  const { successToast, errorToast } = useToast();

  useEffect(() => {
    if (!data) return;

    setTeamName(data.team.name);
  }, [data]);

  const handleChangeTeamName = (value: string) => {
    setTeamName(value);
  };

  const handleUpdateTeam = async () => {
    try {
      setLoading(true);
      await updateTeam();
      successToast("チーム設定を更新しました");
    } catch (e) {
      errorToast("チーム設定の更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = () => {
    if (window.confirm("本当にチームを削除しますか？")) {
      //  TODO チームを削除する処理をかく
    }
  };

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MainHeader />
      <Flex w="full" justifyContent="center" mt="50px">
        <Tabs w="900px">
          <TabList>
            <Tab>チーム設定</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box mx="200px" my="50px">
                <Flex alignItems="center">
                  <FormLabel htmlFor="teamName" whiteSpace="nowrap" minW="100px" m="0">
                    チーム名
                  </FormLabel>
                  <Input
                    type="text"
                    id="teamName"
                    value={teamName}
                    disabled={loading}
                    onChange={(e) => handleChangeTeamName(e.target.value)}
                  />
                </Flex>
                <Flex w="100%" mt="50px">
                  <Button
                    type="submit"
                    colorScheme="blue"
                    variant="outline"
                    ml="auto"
                    w="170px"
                    disabled={loading}
                    onClick={handleUpdateTeam}
                  >
                    更新する
                  </Button>
                </Flex>
                <Flex w="100%" mt="150px" borderTop="1px" borderColor="gray.300">
                  <Button
                    type="submit"
                    colorScheme="red"
                    variant="outline"
                    mt="30px"
                    ml="auto"
                    w="170px"
                    disabled={loading}
                    onClick={handleDeleteTeam}
                  >
                    チームを削除する
                  </Button>
                </Flex>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
};
