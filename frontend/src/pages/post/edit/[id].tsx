import { Button, Container, Flex } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import Wrapper from "../../../components/Wrapper";
import { usePostQuery, useUpdatePostMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import useGetIntId from "../../../utils/hooks/useGetIntId";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout><Container>loading...</Container></Layout>
    )
  }

  if (!data?.post) {
    return (
      <Layout>
        <Container>
          Could Not Find Post
        </Container>
      </Layout>
    )
  }

  return (
    <Layout hero heroText={'Edit Post'}>
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: data.post.title, text: data.post.text }}
          onSubmit={async (values) => {
            await updatePost({ id: intId, ...values });
            router.back();
          }}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <Flex
                justifyContent={`center`}
                alignItems={`center`}
                flexDirection={`column`}
                gap={`2rem`}
              >
                <Field
                  name="title"
                  as={InputField}
                  placeholder="title"
                  label="Title"
                />
                <Field
                  name="text"
                  textarea
                  as={InputField}
                  placeholder="text"
                  label="Body"
                />
                <Button mt={4} isLoading={props.isSubmitting} type="submit">
                  Update Post
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);