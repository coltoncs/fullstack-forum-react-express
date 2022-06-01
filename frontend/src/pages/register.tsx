import { Flex, Button } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import { Field, Form, Formik, FormikProps } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import router from "next/router";
import InputField from "../components/InputField";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Layout hero heroText="Register">
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await register({ options: values });
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
                <Button mt={4} isLoading={props.isSubmitting} type="submit">
                  Register
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(register);
