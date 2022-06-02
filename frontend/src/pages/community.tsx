import { Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout"
import Wrapper from "../components/Wrapper";
import { useUsersQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Community = () => {
  const [{data, fetching}] = useUsersQuery();

  if(fetching){
    return (
      <Layout>
        Fetching community
      </Layout>
    )
  }

  return (
    <Layout>
      <Wrapper>
        <Heading sx={{margin: '25px 0'}}>Community Members</Heading>
        <UnorderedList>
          {data!.users.map(user => {
            return (
              <ListItem key={user.id}>{user.username}</ListItem>
            )
          })}
        </UnorderedList>
      </Wrapper>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(Community);