import { Flex, Text } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import Navigation from "../components/Navigation";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Hero } from "./Hero";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  hero?: React.ReactNode;
  heroText?: string;
}

const Layout: React.FC<LayoutProps> = ({children, hero, heroText}) => { 
  return(
    <>
      <Navigation />
      <Flex flex="0 1 0">
        {/* sidebar 1 */}
        {children}
        {/* sidebar 2 */}
      </Flex>
      <DarkModeSwitch />
      <Footer 
        bgColor="navColor"
        width="100%"
        py="1.5rem"
        justifyContent="center"
        align="center"
      >
        <Text>&copy;2022 Colton Sweeney</Text>
      </Footer>
    </>
  )
}

export default Layout;