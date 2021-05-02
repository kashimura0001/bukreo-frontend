import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";

type Props = {
  teamName: string;
  disabled: boolean;
  isOpen: boolean;
  onChangeName: (teamName: string) => void;
  onCreate: () => void;
  onClose: () => void;
};

export const TeamCreateModal: FC<Props> = ({
  teamName,
  disabled,
  isOpen,
  onChangeName,
  onCreate,
  onClose,
}) => {
  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px" borderColor="gray.400">
          <Flex width="100%" justifyContent="center">
            <Text fontSize="16px" fontWeight="500">
              チームを作成する
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton disabled={disabled} />
        <ModalBody>
          <FormControl mt="50px" px="50px">
            <FormLabel fontSize="14px">チーム名</FormLabel>
            <Input
              value={teamName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="チーム名を入力してください"
              disabled={disabled}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justifyContent="center" mt="50px" mb="30px">
            <Button w="170px" onClick={onClose} disabled={disabled}>
              キャンセル
            </Button>
            <Button
              w="170px"
              colorScheme="blue"
              variant="outline"
              ml={10}
              onClick={onCreate}
              disabled={disabled}
            >
              作成する
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
