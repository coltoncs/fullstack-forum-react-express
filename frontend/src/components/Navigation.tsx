import {
  Link as ChakraLink,
  Text,
  Flex,
  Box,
  Button,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import styled from '@emotion/styled';
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { AddIcon } from "@chakra-ui/icons";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

const NavBar = styled(Flex)`
  @media screen and (max-width: 800px) {
    padding-right: 50px;
  }
`;

export const Navigation: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body;
  if (!data?.me) {
    body = (
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        gap="5px"
        width="50%"
      >
        <Button>
          <NextLink href="/community">
            <ChakraLink color="navBtn">Community</ChakraLink>
          </NextLink>
        </Button>
        <Button>
          <NextLink href="/about">
            <ChakraLink color="navBtn">About</ChakraLink>
          </NextLink>
        </Button>
        <Button>
          <NextLink href="/register">
            <ChakraLink color="navBtn">Register</ChakraLink>
          </NextLink>
        </Button>
        <Button>
          <NextLink href="/login">
            <ChakraLink color="navBtn">Login</ChakraLink>
          </NextLink>
        </Button>
      </Flex>
    );
  } else {
    body = (
      <Flex
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
          <NextLink href="/community">
            <ChakraLink color="navBtn">Community</ChakraLink>
          </NextLink>
        </Button>
        <Button>
          <NextLink href="/about">
            <ChakraLink color="navBtn">About</ChakraLink>
          </NextLink>
        </Button>
        <NextLink href={"/create-post"}>
          <IconButton as={ChakraLink} color="navBtn" aria-label="Create post" icon={<AddIcon />} />
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
      </Flex>
    );
  }
  return (
    <NavBar
      bgColor="navColor"
      h="20"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      as="nav"
    >
      <NextLink href="/">
        <ChakraLink color="navBtn">
          <Heading>CommForum</Heading>
        </ChakraLink>
      </NextLink>
      {body}
    </NavBar>
  );
};

export default Navigation;
