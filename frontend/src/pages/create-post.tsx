import { Button, Flex } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { Hero } from "../components/Hero";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useIsAuth();
  

  return (
    <Layout hero heroText="Create A New Post">
      <Wrapper variant="small">
        <Hero title="Create Post" titleSize={4} />
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const {error} = await createPost({ input: values });
            if(!error){
              router.push('/')
            }
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
                  Create Post
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
