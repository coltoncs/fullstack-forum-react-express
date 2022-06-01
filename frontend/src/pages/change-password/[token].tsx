import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";
import Layout from "../../components/Layout";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState<string>("");

  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await changePassword({
              newPassword: values.newPassword,
              token: typeof router.query.token === "string" ? router.query.token : "",
            });
            if (res.data?.changePassword.errors) {
              const errorMap = toErrorMap(res.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (res.data?.changePassword.user) {
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
                  name="newPassword"
                  as={InputField}
                  placeholder="new password"
                  label="New Password"
                  type="password"
                />
                {tokenError ? (
                  <Flex>
                    <Box mr={2} color="red">
                      {tokenError}
                    </Box>
                    <NextLink href={`/forgot-password`}>
                      <Link>Try Again</Link>
                    </NextLink>
                  </Flex>
                ) : null}
                <Button mt={4} isLoading={props.isSubmitting} type="submit">
                  Log In
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
