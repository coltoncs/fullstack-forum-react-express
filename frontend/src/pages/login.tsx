import { Flex, Button, Link } from "@chakra-ui/react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import { Field, Form, Formik, FormikProps } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import router from "next/router";
import InputField from "../components/InputField";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { Hero } from "../components/Hero";
import { NextPage } from "next";
import withApollo from "../utils/withApollo";
import Head from "next/head";

const Login: NextPage = ({}) => {
  const [login] = useLoginMutation();
  return (
    <>
      <Head>
        <title>Log In | Community Forum</title>
      </Head>
      <Layout>
        <Wrapper variant="small">
          <Hero title="Login" />
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const res = await login({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.login.user,
                    },
                  });
                  cache.evict({ fieldName: "posts:{}" });
                },
              });
              if (res.data?.login.errors) {
                setErrors(toErrorMap(res.data.login.errors));
              } else if (res.data?.login.user) {
                if (typeof router.query.next === "string") {
                  router.push(router.query.next || "/");
                } else {
                  router.push("/");
                }
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
                    name="usernameOrEmail"
                    as={InputField}
                    placeholder="Enter your username or email..."
                    label="Username or Email"
                  />
                  <Field
                    name="password"
                    as={InputField}
                    placeholder="Enter your password..."
                    label="Password"
                    type="password"
                  />
                  <Flex flexDir={"column"} align={`center`} gap={`25px`}>
                    <Button mt={4} isLoading={props.isSubmitting} type="submit">
                      Log In
                    </Button>
                    <NextLink href={`/forgot-password`}>
                      <Link>Forgot password?</Link>
                    </NextLink>
                    <NextLink href={`/register`}>
                      <Link>Need to create an account?</Link>
                    </NextLink>
                  </Flex>
                </Flex>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: false })(Login);
