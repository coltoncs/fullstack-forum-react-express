import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import NextLink from 'next/link';
import { UpvoteSection } from "../components/UpvoteSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables
  });

  // if(!fetching && !data) {
  //   return <div>Query failed for some reason</div>
  // }

  return (
    <Layout hero>
      <Wrapper variant="large">
        <Text color="text" align={'center'} mb={10}>
          Testing out full-stack applications built with
          Express+Apollo+PostgreSQL backends and React+TS+Chakra frontends.
        </Text>
        <NextLink href={'/create-post'}>
          <Link as={Button} mb={10}>Create Post</Link>
        </NextLink>
        <Stack spacing={8}>
          {fetching && !data
            ? (<div>loading...</div>)
            : data!.posts.posts.map((post) => {
              let newDate = new Date();
              const date: any = post.createdAt;
              newDate.setTime(date);
              const dateString = newDate.toUTCString();
              const formattedDateString = dateString.split(' ');
              const hours = newDate.getHours();
              const minutes = newDate.getMinutes();
              const year = newDate.getFullYear();
              let timeOfDay;
              if (hours>12) {
                timeOfDay = 'PM'
              } else {
                timeOfDay = 'AM'
              }
              const outputString = formattedDateString[0] + ' ' + formattedDateString[1] + ' ' + formattedDateString[2] + " " + year + ' @ ' + hours + ":" + minutes + " " + timeOfDay;
              

              return (
                <Flex
                  key={post.id} 
                  p={5} 
                  shadow="md" 
                  borderWidth="1px"
                  bgColor="whiteAlpha.100"
                >
                  <UpvoteSection post={post} />
                  <Box>
                    <NextLink href="post/[id]" as={`post/${post.id}`}><Link><Heading fontSize="xl">{post.title}</Heading></Link></NextLink> 
                    <Text>Posted by {post.creator.username} on {outputString}</Text>
                    <Text mt={4}>{post.textSnippet}</Text>
                  </Box>
                </Flex>
              )
            })
          }
        </Stack>
        {data && data.posts.hasMore ? (
        <Flex>
          <Button m={`auto`} my={8} onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length-1].createdAt,
            })
          }}>Load More</Button>
        </Flex>
        ) : null}
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
