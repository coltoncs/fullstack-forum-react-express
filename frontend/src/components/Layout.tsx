import { Text } from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import Navigation from "../components/Navigation";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Hero } from "./Hero";

type LayoutProps = {
  hero?: React.ReactNode;
  heroText?: string;
}

const Layout: React.FC<LayoutProps> = ({children, hero, heroText}) => (
  <>
    <Navigation />
    {hero ? <Hero title={heroText} /> : null}
    {children}
    <DarkModeSwitch />
    <Footer 
      bgColor={`gray.700`}
      width={`100%`}
      py={`2rem`}
      justifyContent={`center`}
    >
      <Text>&copy;2022 Colton Sweeney</Text>
    </Footer>
  </>
)

export default Layout;