import {
  Link as ChakraLink,
  Text,
  Flex,
  Box,
  Button,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { AddIcon } from "@chakra-ui/icons";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

const NavBar = styled(Flex)`
  @media screen and (max-width: 600px) {
    height: 120px;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 20px;
  }
`;

const NavBody = styled(Flex)`
  @media screen and (max-width: 600px) {
    width: 100%;
    justify-content: space-around;
  }
`;

const Link = styled(ChakraLink)`
  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
  }
`;

export const Navigation: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery({
    pause: isServer(),
  });

  let body;
  if (!data?.me) {
    body = (
      <NavBody
        justifyContent="flex-end"
        alignItems="center"
        gap="5px"
        width="50%"
      >
        <Button>
          <NextLink href="/about">
            <Link color="navBtn">About</Link>
          </NextLink>
        </Button>
        <Button>
          <NextLink href="/register">
            <Link color="navBtn">Register</Link>
          </NextLink>
        </Button>
        <Button>
          <NextLink href="/login">
            <Link color="navBtn">Login</Link>
          </NextLink>
        </Button>
      </NavBody>
    );
  } else {
    body = (
      <NavBody
        justifyContent="flex-end"
        alignItems="center"
        gap="15px"
        width="75%"
        color="navText"
      >
        <Box>
          <Text color="navBtn">Welcome, {data.me?.username}</Text>
        </Box>
        <Button>
          <NextLink href="/about">
            <ChakraLink color="navBtn">About</ChakraLink>
          </NextLink>
        </Button>
        <NextLink href={"/create-post"}>
          <IconButton
            as={ChakraLink}
            color="navBtn"
            aria-label="Create post"
            icon={<AddIcon />}
          />
        </NextLink>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          color="navBtn"
        >
          Logout
        </Button>
      </NavBody>
    );
  }
  return (
    <>
      <NavBar
        bgColor="navColor"
        h="20"
        justifyContent="center"
        alignItems="center"
        width="100%"
        as="nav"
      >
        <NextLink href="/">
          <ChakraLink color="navBtn">
            <Heading>CommForum</Heading>
          </ChakraLink>
        </NextLink>
        {body}
      </NavBar>
    </>
  );
};

export default Navigation;
