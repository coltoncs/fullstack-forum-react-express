import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Link } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import Navigation from "../components/Navigation";
import { DarkModeSwitch } from "./DarkModeSwitch";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({children}) => { 
  return(
    <>
      <Navigation />
      <Flex flex="0 1 0" pb="5%">
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
        <Flex justify="center" align="center"><Link href="https://coltonsweeney.com/" target="_blank" rel="noreferrer">&copy;2022 Colton Sweeney</Link><ExternalLinkIcon boxSize="15px" mx="5px" /></Flex>
      </Footer>
    </>
  )
}

export default Layout;