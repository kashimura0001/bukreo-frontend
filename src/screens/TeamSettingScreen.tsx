import React, { FC, useEffect, useState } from "react";
import { MainHeader } from "../components/MainHeader";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Button, Input, FormLabel } from "@chakra-ui/react";
import { TeamSettingScreenDocument } from "../graphql/schema";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

type Props = {};

export const TeamSettingScreen: FC<Props> = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data } = useQuery(TeamSettingScreenDocument, { variables: { teamId } });
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    if (!data) return;

    setTeamName(data.team.name);
  }, [data]);

  const handleChangeTeamName = (value: string) => {
    setTeamName(value);
  };

  const handleDeleteTeam = () => {
    if (window.confirm("本当にチームを削除しますか？")) {
      //  TODO チームを削除する処理をかく
    }
  };

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
                    onChange={(e) => handleChangeTeamName(e.target.value)}
                  />
                </Flex>
                <Flex w="100%" mt="50px">
                  <Button type="submit" colorScheme="blue" variant="outline" ml="auto" w="170px">
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
