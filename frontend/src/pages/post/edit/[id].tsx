import { Button, Container, Flex } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps, useFormik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Hero } from "../../../components/Hero";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import Wrapper from "../../../components/Wrapper";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import useGetIntId from "../../../utils/hooks/useGetIntId";

const EditPost: NextPage = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [updatePost] = useUpdatePostMutation();
  const [title, setTitle] = useState<string>();

  if (loading) {
    return (
      <Layout>
        <Container>loading...</Container>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Container>Could Not Find Post</Container>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>(Edit) {data.post.title.slice(0,20)} | Community Forum</title>
      </Head>
      <Layout>
        <Wrapper variant="small">
          <Hero
            title={`(Edit) ${title ? title : data.post.title}`}
            titleSize={3}
          />
          <Formik
            initialValues={{ title: data.post.title, text: data.post.text }}
            onSubmit={async (values) => {
              await updatePost({ variables: { id: intId, ...values } });
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
    </>
  );
};

export default EditPost;
