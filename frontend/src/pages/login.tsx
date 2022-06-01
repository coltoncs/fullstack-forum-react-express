import { Flex, Button, Link } from "@chakra-ui/react";
import { useLoginMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import { Field, Form, Formik, FormikProps } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import router from "next/router";
import InputField from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import Layout from "../components/Layout";

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  return (
    <Layout hero heroText="Login">
        <Wrapper variant="small">
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const res = await login(values);
              if (res.data?.login.errors) {
                setErrors(toErrorMap(res.data.login.errors));
              } else if (res.data?.login.user) {
                if (typeof router.query.next === 'string') {
                  router.push(router.query.next || "/");
                } else {
                  router.push('/');
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
                  <Flex flexDir={'column'} align={`center`} gap={`25px`}>
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
  );
};

export default withUrqlClient(createUrqlClient)(Login);
