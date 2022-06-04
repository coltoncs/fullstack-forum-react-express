import { Text, ListItem, UnorderedList } from "@chakra-ui/react";
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
      return <ListItem key={user.id}>{user.username}</ListItem>;
    });
  }

  return (
    <Layout>
      <Wrapper>
        <Hero title="Community Members" titleSize={4}/>
        <UnorderedList>
          {body}
        </UnorderedList>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Community);
