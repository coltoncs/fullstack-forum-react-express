import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex flexDir={"column"} justify={`center`} align={`center`} mr={5}>
      <ChevronUpIcon
        boxSize={"24px"}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          vote({
            postId: post.id,
            value: 1
          });
        }}
        color={post.voteStatus === 1 ? 'green' : undefined}
      />
      {post.points}
      <ChevronDownIcon 
        boxSize={"24px"}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          vote({
            postId: post.id,
            value: -1
          });
        }}
        color={post.voteStatus === -1 ? 'red' : undefined}
      />
    </Flex>
  );
};

