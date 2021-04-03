import { VFC, useState, ChangeEvent } from "react";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type Props = {
  placeholder: string;
  value: string;
  size: "xs" | "sm" | "md" | "lg";
  backgroundColor: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordInput: VFC<Props> = ({
  placeholder,
  value,
  size,
  backgroundColor,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        size={size}
        placeholder={placeholder}
        value={value}
        backgroundColor={backgroundColor}
        onChange={onChange}
      />
      <InputRightElement w="3rem" h="full">
        <Button size="sm" onClick={handleClick}>
          {show ? <ViewOffIcon /> : <ViewIcon />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
