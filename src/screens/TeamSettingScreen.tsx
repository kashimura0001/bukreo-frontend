import React, { FC, useEffect, useState } from "react";
import { MainHeader } from "../components/MainHeader";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Button, Input, FormLabel } from "@chakra-ui/react";
import { useTeamSettingScreenQuery, useUpdateTeamMutation, useDeleteTeamMutation } from "../graphql/schema";
import { useHistory, useParams } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { LoadingScreen } from "./LoadingScreen";
import { TEAMS_PATH } from "../config/routes";

type Props = {};

export const TeamSettingScreen: FC<Props> = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const { teamId } = useParams<{ teamId: string }>();
  const { data } = useTeamSettingScreenQuery({ variables: { teamId } });
  const [updateTeam] = useUpdateTeamMutation({
    variables: { teamId, name: teamName },
  });
  const [deleteTeam] = useDeleteTeamMutation({
    variables: { teamId },
    update(cache, { data }) {
      if (!data) return;
      cache.modify({
        id: cache.identify(data.deleteTeam),
        fields(_fieldValue, details) {
          return details.DELETE;
        },
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

  const handleDeleteTeam = async () => {
    if (window.confirm("本当にチームを削除しますか？")) {
      try {
        setLoading(true);
        await deleteTeam();
        successToast("チームを削除しました");
        history.push(TEAMS_PATH);
      } catch (e) {
        errorToast("チームの削除に失敗しました");
      } finally {
        setLoading(false);
      }
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
