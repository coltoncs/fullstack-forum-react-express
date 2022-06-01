import { Box, Button, Flex } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Flex justifyContent={`center`} alignItems={`center`} h={`90vh`}>
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {(props: FormikProps<any>) =>
          complete ? (
            <Box>Thank you! If an account with that email exists, we've sent them an email.</Box>
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
                  placeholder="email"
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
    </Flex>
  );
};

export default ForgotPassword;
