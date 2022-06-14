import { Container, Flex, Link } from "@chakra-ui/react";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import NextLink from "next/link";
import Layout from "../../components/Layout";
import Wrapper from "../../components/Wrapper";
import useGetPostFromUrl from "../../utils/hooks/useGetPostFromUrl";
import { Hero } from "../../components/Hero";
import { NextPage } from "next";
import { withApollo } from "../../utils/withApollo";

const Post: NextPage = () => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
    return <Layout>...post fetching...</Layout>;
  }

  if (error) {
    return <Layout>Error: {error.message}</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Container sx={{ height: "50vh" }}>
          <Hero title="No Post Found" titleSize={3.7} />
          <Flex flexDir="column" justify="center" align="center">
            <NextLink href={"/"}>
              <Link>Go Home</Link>
            </NextLink>
          </Flex>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper variant="large">
        <Hero title={data.post.title} titleSize={3} />
        <Flex flexDir="column" gap="15px">
          {data.post.text}
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
