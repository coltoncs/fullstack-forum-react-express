import { Text, ListItem, UnorderedList, Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Hero } from "../components/Hero";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { useUsersQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Community = () => {
  const [{ data, fetching }] = useUsersQuery();

  let body;
  if (fetching) {
    body = <Text>Fetching members...</Text>;
  } else {
    body = data!.users.map((user) => {
      return (
        <Box sx={{
          background: "linear-gradient(to right, red, purple)",
          padding: "3px",
          position: 'relative'
        }}>
          <ListItem
            w="100%"
            sx={{
              background: "gray.500",
              padding: "5px",
              listStyle: "none",
            }}
            key={user.id}
          >
            <Text align="center">{user.username}</Text>
          </ListItem>
        </Box>
      );
    });
  }

  return (
    <Layout>
      <Wrapper>
        <Hero title="Community Members" titleSize={4} />
        <UnorderedList>{body}</UnorderedList>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Community);
