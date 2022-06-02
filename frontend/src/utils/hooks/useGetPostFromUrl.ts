import { usePostQuery } from "../../generated/graphql";
import useGetIntId from "./useGetIntId";

const getPostFromUrl = () => {
  const intId = useGetIntId();
    
  return usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};

export default getPostFromUrl;