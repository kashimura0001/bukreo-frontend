import { useToast as useChakraUiToast } from "@chakra-ui/react";

export const useToast = () => {
  const toast = useChakraUiToast();

  const successToast = (message: string) => {
    toast({
      position: "top",
      isClosable: true,
      status: "success",
      title: message,
    });
  };

  const errorToast = (message: string) => {
    toast({
      position: "top",
      isClosable: true,
      status: "error",
      title: message,
    });
  };

  return { successToast, errorToast };
};
