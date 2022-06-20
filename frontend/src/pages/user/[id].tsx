import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Hero } from "../../components/Hero";
import Layout from "../../components/Layout";
import NextLink from "next/link";
import { UpvoteSection } from "../../components/UpvoteSection";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import { dateTimeFormat } from "../../utils/stringFormatter";
import { NextPage } from "next";
import { useMeQuery, usePostsByUserIdQuery } from "../../generated/graphql";
import withApollo from "../../utils/withApollo";
import useGetIntId from "../../utils/hooks/useGetIntId";
import Head from "next/head";

const UserProfile: NextPage = () => {
  const uid = useGetIntId();
  const { data: meData } = useMeQuery();

  const { data, error, loading } = usePostsByUserIdQuery({
    variables: {
      userId: uid,
    }
  });

  if (loading) {
    return (
      <>
      <Head>
        <title>User Profile | Community Forum</title>
      </Head>
      <Layout>
        <Container sx={{ height: "50vh" }}>
          <Text>Fetching Posts...</Text>
        </Container>
      </Layout>
      </>
    );
  }

  if (error) {
    return (
      <>
      <Head>
        <title>User Error | Community Forum</title>
      </Head>
      <Layout>
        <Container sx={{ height: "50vh" }}>
          <Hero title="Error" titleSize={3.7} />
          <Flex flexDir="column" justify="center" align="center">
            <Text>{error.toString()}</Text>
          </Flex>
        </Container>
      </Layout>
      </>
    );
  }

  if (!data) {
    return (
      <>
      <Head>
        <title>User Not Found | Community Forum</title>
      </Head>
      <Layout>
        <Container sx={{ height: "50vh" }}>
          <Hero title="User Not Found" titleSize={3.7} />
          <Flex flexDir="column" justify="center" align="center">
            <NextLink href={"/"}>
              <Link>Go Home</Link>
            </NextLink>
          </Flex>
        </Container>
      </Layout>
      </>
    );
  }

  return (
    <>
    <Head>
      <title>{meData?.me?.username} | Community Forum</title>
    </Head>
    <Layout>
      <Container>
        <Hero title={meData?.me?.username} titleSize={3.7} />
        <Flex flexDir="column" gap={5}>
          {data.postsByUserId?.map((post) => {
            let outputString: string = dateTimeFormat(post.createdAt);
            return (
              <Flex
                key={post.id}
                p={5}
                shadow="md"
                borderWidth="1px"
                bgColor="whiteAlpha.100"
                borderRadius={"8px"}
              >
                <UpvoteSection post={post} />
                <Box flex={1}>
                  <NextLink href="post/[id]" as={`post/${post.id}`}>
                    <Link>
                      <Heading fontSize="xl">{post.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>
                    Posted by {post.creator.username} on {outputString}
                  </Text>
                  <Flex>
                    <Text flex={1} mt={4}>
                      {post.textSnippet}
                    </Text>
                  </Flex>
                </Box>
                <EditDeletePostButtons
                  id={post.id}
                  creatorId={post.creator.id}
                />
              </Flex>
            );
          })}
        </Flex>
      </Container>
    </Layout>
    </>
  );
};

export default withApollo({ ssr: true })(UserProfile);
