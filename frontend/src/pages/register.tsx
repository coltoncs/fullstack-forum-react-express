import { Flex, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import { Field, Form, Formik, FormikProps } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import router from "next/router";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { Hero } from "../components/Hero";
import { NextPage } from "next";
import { withApollo } from "../utils/withApollo";
import Head from "next/head";

const Register: NextPage = ({}) => {
  const [register] = useRegisterMutation();
  return (
    <>
      <Head>
        <title>Register | Community Forum</title>
      </Head>
      <Layout>
        <Wrapper variant="small">
          <Hero title="Register" />
          <Formik
            initialValues={{ email: "", username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const res = await register({
                variables: { options: values },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.register.user,
                    },
                  });
                },
              });
              console.log(res);
              if (res.data?.register.errors) {
                setErrors(toErrorMap(res.data.register.errors));
              } else if (res.data?.register.user) {
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
                    name="username"
                    as={InputField}
                    placeholder="Enter your username..."
                    label="Username"
                  />
                  <Field
                    name="email"
                    as={InputField}
                    placeholder="Enter your email..."
                    label="Email"
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
                      Register
                    </Button>
                    <NextLink href={`/login`}>
                      <Link>Already have an account?</Link>
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

export default withApollo({ ssr: false })(Register);
