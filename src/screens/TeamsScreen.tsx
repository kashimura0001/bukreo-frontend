import React, { FC, useState } from "react";
import { TeamsScreenDocument, useCreateTeamMutation, useTeamsScreenQuery } from "../graphql/schema";
import { MainHeader } from "../components/MainHeader";
import { Box, Flex, HStack, Stack, Button, Avatar } from "@chakra-ui/react";
import { TeamCreateModal } from "../components/TeamCreateModal";
import { useToast } from "../hooks/useToast";
import { colors } from "../constants/color";
import { generatePath, Link } from "react-router-dom";
import { TIMELINE_PATH } from "../config/routes";

type Props = {};

export const TeamsScreen: FC<Props> = () => {
  const { successToast, errorToast } = useToast();
  const [teamName, setTeamName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const { data, error } = useTeamsScreenQuery();
  const [createTeam] = useCreateTeamMutation({
    variables: { name: teamName },
    update(cache, { data }) {
      if (!data) return;
      cache.writeQuery({ query: TeamsScreenDocument, data: { currentUser: { teams: data.createTeam } } });
    },
  });

  const teams = data?.currentUser.teams;

  const handleChangeTeamName = (value: string) => {
    setTeamName(value);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleCreateTeam = async () => {
    setIsCreatingTeam(true);
    try {
      await createTeam();
      setTeamName("");
      successToast("チームを作成しました");
    } catch (e) {
      errorToast("チームの作成に失敗しました");
    } finally {
      setIsCreatingTeam(false);
      handleCloseModal();
    }
  };

  if (error) throw error;

  return (
    <>
      <MainHeader />
      <Flex w="full" justifyContent="center" mt="200px">
        <Box
          w="400px"
          bgColor={colors.semantics.itemBackground}
          border="1px"
          borderRadius="5px"
          borderColor={colors.semantics.border}
          boxShadow="md"
        >
          <Box
            p="20px"
            borderBottom="1px"
            borderColor={colors.semantics.border}
            color={colors.semantics.subText}
          >{`${data?.currentUser.name} さんのチーム`}</Box>
          <Stack px="30px">
            {teams &&
              teams.map((team) => {
                if (!team) return;
                return (
                  <Link key={team.id} to={generatePath(TIMELINE_PATH, { teamId: team.id })}>
                    <HStack
                      w="100%"
                      p="20px"
                      borderBottom="1px"
                      borderColor={colors.semantics.border}
                      _hover={{ fontWeight: "bold" }}
                    >
                      {/* TODO: チームのアイコンを設定する*/}
                      <Avatar
                        name={team.name}
                        minW="45px"
                        minH="45px"
                        backgroundColor={colors.semantics.defaultIconBackground}
                        color={colors.semantics.whiteText}
                        fontSize="20px"
                        fontWeight="bold"
                      />
                      <Box pl="15px">{team.name}</Box>
                    </HStack>
                  </Link>
                );
              })}
          </Stack>
          <Box textAlign="center" mt="50px" mb="20px">
            <Button color={colors.semantics.linkText} fontWeight="normal" variant="link" onClick={handleOpenModal}>
              新しいチームを作成する →
            </Button>
          </Box>
        </Box>
      </Flex>
      <TeamCreateModal
        teamName={teamName}
        disabled={isCreatingTeam}
        isOpen={isOpenModal}
        onChangeName={handleChangeTeamName}
        onCreate={handleCreateTeam}
        onClose={handleCloseModal}
      />
    </>
  );
};
