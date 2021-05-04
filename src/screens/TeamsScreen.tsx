import React, { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateTeamDocument, useTeamsScreenQuery } from "../graphql/schema";
import { MainHeader } from "../components/MainHeader";
import { TeamListHeader } from "../components/TeamListHeader";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { TeamCreateModal } from "../components/TeamCreateModal";
import { useToast } from "../hooks/useToast";
import { TeamListRow } from "../components/TeamListRow";

type Props = {};

// TODO userから直接teamsを引けるようにAPIを修正する
// TODO ↑が完了したらチームを追加したあとrefetchではなくてキャッシュを更新するようにする
export const TeamsScreen: FC<Props> = () => {
  const { successToast, errorToast } = useToast();
  const [teamName, setTeamName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const { data, error, refetch } = useTeamsScreenQuery();
  const [createTeam] = useMutation(CreateTeamDocument, {
    variables: { name: teamName },
  });
  const members = data?.currentUser.members;

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
      refetch();
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
            {members ? (
              members.map((member) => {
                if (member) {
                  return <TeamListRow key={member.team.id} member={member} />;
                }
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
