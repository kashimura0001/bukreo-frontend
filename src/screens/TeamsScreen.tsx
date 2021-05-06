import React, { FC, useState } from "react";
import { TeamsScreenDocument, useCreateTeamMutation, useTeamsScreenQuery } from "../graphql/schema";
import { MainHeader } from "../components/MainHeader";
import { TeamListHeader } from "../components/TeamListHeader";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { TeamCreateModal } from "../components/TeamCreateModal";
import { useToast } from "../hooks/useToast";
import { TeamListRow } from "../components/TeamListRow";
import { useApolloClient } from "@apollo/client";

type Props = {};

export const TeamsScreen: FC<Props> = () => {
  const client = useApolloClient();
  const { successToast, errorToast } = useToast();
  const [teamName, setTeamName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const { data, error } = useTeamsScreenQuery();
  const [createTeam] = useCreateTeamMutation({
    variables: { name: teamName },
    onCompleted(data) {
      client.writeQuery({ query: TeamsScreenDocument, data: { currentUser: { teams: data.createTeam } } });
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
      <Flex w="full" justifyContent="center" mt="100px">
        <Box w="900px">
          <TeamListHeader onCreateTeamButton={handleOpenModal} />
          <SimpleGrid my="30px" spacing="30px">
            {teams ? (
              teams.map((team) => {
                return team && <TeamListRow key={team.id} team={team} />;
              })
            ) : (
              <Skeleton w="100%" h="100px" borderRadius="10px" />
            )}
          </SimpleGrid>
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
