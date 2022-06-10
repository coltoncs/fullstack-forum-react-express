import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Hero } from "../../components/Hero";
import Layout from "../../components/Layout";
import NextLink from "next/link";
import { useMeQuery, usePostsByUserIdQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { UpvoteSection } from "../../components/UpvoteSection";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import { dateTimeFormat } from "../../utils/stringFormatter";

const UserProfile: React.FC<{}> = ({}) => {
  const [{ data, error, fetching }] = usePostsByUserIdQuery({
    variables: {
      userId: 1,
    },
  });
  const [{ data: meData }] = useMeQuery();

  if (fetching) {
    return (
      <Layout>
        <Container sx={{ height: "50vh" }}>
          <Text>Fetching Posts...</Text>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container sx={{ height: "50vh" }}>
          <Hero title="Error" titleSize={3.7} />
          <Flex flexDir="column" justify="center" align="center">
            <Text>{error.toString()}</Text>
          </Flex>
        </Container>
      </Layout>
    );
  }

  if (!data || !meData?.me) {
    return (
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
    );
  }

  return (
    <Layout>
      <Container>
        <Hero title={meData.me.username} titleSize={3.7} />
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
  );
};

export default withUrqlClient(createUrqlClient)(UserProfile);