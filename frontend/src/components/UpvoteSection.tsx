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
        sx={
          {
            cursor: 'pointer',
            padding: '5px',
            marginBottom: '5px',
            borderRadius: '8px',
            background: `${post.voteStatus === 1 ? 'rgba(0,255,0,0.2)' : 'whiteAlpha.300'}`,
            boxShadow: '0 0 5px rgba(0,0,0,0.3)',
            transition: 'box-shadow .2s ease-in-out',
          }
        }
        _hover={
          {
            boxShadow: '0 0 5px rgba(255,255,255,0.3)',
          }
        }
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
        color={post.voteStatus === 1 ? '#7CFC00' : undefined}
      />
      {post.points}
      <ChevronDownIcon 
        sx={
          {
            cursor: 'pointer',
            padding: '5px',
            marginTop: '5px',
            borderRadius: '8px',
            background: `${post.voteStatus === -1 ? 'rgba(255,0,0,0.2)' : 'whiteAlpha.300'}`,
            boxShadow: '0 0 5px rgba(0,0,0,0.3)',
            transition: 'box-shadow .2s ease-in-out',
          }
        }
        _hover={
          {
            boxShadow: '0 0 5px rgba(255,255,255,0.3)',
          }
        }
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
        color={post.voteStatus === -1 ? '#D2042D' : undefined}
      />
    </Flex>
  );
};

