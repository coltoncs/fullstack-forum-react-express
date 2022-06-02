import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import Layout from "../components/Layout";
import { UpvoteSection } from "../components/UpvoteSection";
import Wrapper from "../components/Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { dateTimeFormat } from "../utils/stringFormatter";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  return (
    <Layout hero>
      <Wrapper variant="large">
        <Text color="text" align={"center"} mb={10}>
          Testing out full-stack applications built with
          Express+Apollo+PostgreSQL backends and React+TS+Chakra frontends.
        </Text>
        <NextLink href={"/create-post"}>
          <Link as={Button} mb={10}>
            Create Post
          </Link>
        </NextLink>
        <Stack spacing={8}>
          {fetching && !data ? (
            <div>loading...</div>
          ) : (
            data!.posts.posts.map((post) => {
              let outputString: string = dateTimeFormat(post.createdAt);
              return !post ? null : (
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
                  <EditDeletePostButtons id={post.id} creatorId={post.creator.id}/>
                </Flex>
              );
            })
          )}
        </Stack>
        {data && data.posts.hasMore ? (
          <Flex>
            <Button
              m={`auto`}
              my={8}
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                });
              }}
            >
              Load More
            </Button>
          </Flex>
        ) : null}
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
