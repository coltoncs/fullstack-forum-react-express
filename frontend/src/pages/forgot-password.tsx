import { Box, Button, Flex } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Hero } from "../components/Hero";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import withApollo from "../utils/withApollo";

const ForgotPassword: NextPage = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <>
      <Head>
        <title>Forgot Password | Community Forum</title>
      </Head>
      <Layout>
        <Wrapper variant="small">
          <Hero title="Forgot Password" titleSize={3} />
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              await forgotPassword({ variables: values });
              setComplete(true);
            }}
          >
            {(props: FormikProps<any>) =>
              complete ? (
                <Box>
                  Thank you! If an account with that email exists, we've sent
                  them an email.
                </Box>
              ) : (
                <Form>
                  <Flex
                    justifyContent={`center`}
                    alignItems={`center`}
                    flexDirection={`column`}
                    gap={`2rem`}
                  >
                    <Field
                      name="email"
                      as={InputField}
                      placeholder="Enter your email"
                      label="Email"
                    />
                    <Button mt={4} isLoading={props.isSubmitting} type="submit">
                      Forgot Password
                    </Button>
                  </Flex>
                </Form>
              )
            }
          </Formik>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
