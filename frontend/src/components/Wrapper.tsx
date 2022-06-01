import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular" | "large";

interface WrapperProps {
  variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {

  const size = (option: String) => {
    if(option === "regular") {
      return "800px"
    } else if (option === "large") {
      return "1200px"
    } else {
      return "600px"
    }
  }

  return (
    <Box
      maxW={size(variant)}
      mx={`auto`}
      mb={`4rem`}
      w={`100%`}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
