import { Button, Flex } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import Layout from "../components/Layout";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { Hero } from "../components/Hero";
import { NextPage } from "next";
import Head from "next/head";

const CreatePost: NextPage = ({}) => {
  const router = useRouter();
  const [createPost] = useCreatePostMutation();
  useIsAuth();

  return (
    <>
      <Head>
        <title>Create A Post | Community Forum</title>
      </Head>
      <Layout>
        <Wrapper variant="small">
          <Hero title="Create A Post" titleSize={4} />
          <Formik
            initialValues={{ title: "", text: "" }}
            onSubmit={async (values) => {
              const { errors } = await createPost({
                variables: { input: values },
                update: (cache) => cache.evict({ fieldName: "posts:{}" }),
              });
              if (!errors) {
                router.push("/");
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
                    placeholder="Enter a post title..."
                    label="Title"
                    variant="filled"
                  />
                  <Field
                    name="text"
                    textarea
                    as={InputField}
                    placeholder="Write your post here..."
                    label="Body"
                    variant="filled"
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
    </>
  );
};

export default CreatePost;
