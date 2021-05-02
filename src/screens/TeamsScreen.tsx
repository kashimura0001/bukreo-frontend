import React, { FC, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CreateTeamDocument, TeamsScreenDocument } from "../graphql/schema";
import { MainHeader } from "../components/MainHeader";
import { TeamListHeader } from "../components/TeamListHeader";
import { TeamList } from "../components/TeamList";
import { Box, Flex } from "@chakra-ui/react";
import { TeamCreateModal } from "../components/TeamCreateModal";
import { useToast } from "../hooks/useToast";

type Props = {};

// TODO userから直接teamsを引けるようにAPIを修正する
// TODO ↑が完了したらチームを追加したあとrefetchではなくてキャッシュを更新するようにする
export const TeamsScreen: FC<Props> = () => {
  const { successToast, errorToast } = useToast();
  const [teamName, setTeamName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const { data, error, refetch } = useQuery(TeamsScreenDocument);
  const [createTeam] = useMutation(CreateTeamDocument, {
    variables: { name: teamName },
  });

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
      <MainHeader avatarUrl={data?.currentUser?.avatarUrl} />
      <Flex w="full" justifyContent="center" mt="100px">
        <Box w="900px">
          <TeamListHeader onCreateTeamButton={handleOpenModal} />
          <Box mt="30px">
            <TeamList members={data?.currentUser.members} />
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
