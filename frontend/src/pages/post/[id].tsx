import { Flex, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import Layout from "../../components/Layout";
import Wrapper from "../../components/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import useGetPostFromUrl from "../../utils/hooks/useGetPostFromUrl";

const Post = () => {
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return <Layout>...post fetching...</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Heading>No Post Found</Heading>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper variant="large">
        <Flex flexDir="column" gap="15px">
          <Heading>{data.post.title}</Heading>
          {data.post.text}
          <EditDeletePostButtons id={data.post.id} creatorId={data.post.creator.id}/>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
