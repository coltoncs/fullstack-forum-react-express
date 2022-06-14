import { usePostQuery, usePostsByUserIdQuery } from "../../generated/graphql";
import useGetIntId from "./useGetIntId";

const getPostFromUrl = () => {
  const intId = useGetIntId();

  return usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};

export default getPostFromUrl;
