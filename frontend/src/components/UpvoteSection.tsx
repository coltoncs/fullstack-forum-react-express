import { ApolloCache } from "@apollo/client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { gql } from "graphql-tag";
import { NextPage } from "next";

import { PostSnippetFragment, useVoteMutation, VoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

export const UpvoteSection: NextPage<UpvoteSectionProps> = ({ post }) => {
  const [vote] = useVoteMutation();
  return (
    <Flex flexDir={"column"} justify={`center`} align={`center`} mr={5}>
      <ChevronUpIcon
        sx={{
          cursor: "pointer",
          padding: "5px",
          marginBottom: "5px",
          borderRadius: "8px",
          background: `${
            post.voteStatus === 1 ? "rgba(0,255,0,0.2)" : "whiteAlpha.300"
          }`,
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          transition: "box-shadow .2s ease-in-out",
        }}
        _hover={{
          boxShadow: "0 0 5px rgba(255,255,255,0.3)",
        }}
        boxSize={"24px"}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
        }}
        color={post.voteStatus === 1 ? "#7CFC00" : undefined}
      />
      {post.points}
      <ChevronDownIcon
        sx={{
          cursor: "pointer",
          padding: "5px",
          marginTop: "5px",
          borderRadius: "8px",
          background: `${
            post.voteStatus === -1 ? "rgba(255,0,0,0.2)" : "whiteAlpha.300"
          }`,
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
          transition: "box-shadow .2s ease-in-out",
        }}
        _hover={{
          boxShadow: "0 0 5px rgba(255,255,255,0.3)",
        }}
        boxSize={"24px"}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
        }}
        color={post.voteStatus === -1 ? "#D2042D" : undefined}
      />
    </Flex>
  );
};
