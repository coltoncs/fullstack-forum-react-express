import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Size, useWindowSize } from "../utils/hooks/useWindowSize";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const size: Size = useWindowSize();
  const isDark = colorMode === "dark";

if (size.width !== undefined && size.width < 1400) {
    return (
      <IconButton
        position="fixed"
        bottom={1}
        zIndex={1}
        right={5}
        icon={isDark ? <SunIcon /> : <MoonIcon />}
        aria-label="Toggle Theme"
        colorScheme="pink"
        onClick={toggleColorMode}
      />
    );
  } else {
    return (
      <IconButton
        position="fixed"
        top={5}
        right={5}
        icon={isDark ? <SunIcon /> : <MoonIcon />}
        aria-label="Toggle Theme"
        colorScheme="pink"
        onClick={toggleColorMode}
      />
    );
  }
};
