import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();

  if(meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Flex flexDir="column" justifyContent="space-between" height={100}>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} aria-label="Edit post" icon={<EditIcon />} isRound />
      </NextLink>
      <IconButton
        aria-label="Delete post"
        icon={
          <DeleteIcon
            onClick={() => {
              deletePost({ variables: { id }, update: (cache) => {
                cache.evict({ id: 'Post:' + id });
              } });
            }}
          />
        }
        isRound
      />
    </Flex>
  );
};

export default EditDeletePostButtons;
