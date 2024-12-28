import {
  Container,
  Flex,
  TextField,
  Button,
  Text,
  Heading,
  Card,
} from "@radix-ui/themes";
import { LockClosedIcon, PersonIcon } from "@radix-ui/react-icons";
import { createUser } from "../-/actions";

const LoginPage = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ minHeight: "100vh" }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50"
    >
      <Container size="1">
        <form action={createUser}>
          <Card size="4">
            <Flex direction="column" gap="5" p="6">
              <Flex direction="column" gap="3" align="center">
                <Heading size="8" align="center" mb="2">
                  Welcome Back
                </Heading>
                <Text size="3" color="gray">
                  Sign in to continue to your account
                </Text>
              </Flex>

              <Flex direction="column" gap="4">
                <TextField.Root placeholder="Name">
                  <TextField.Slot>
                    <PersonIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="Email address">
                  <TextField.Slot>
                    <PersonIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>

                <TextField.Root placeholder="Password" type="text">
                  <TextField.Slot>
                    <LockClosedIcon height="16" width="16" />
                  </TextField.Slot>
                  {/* <TextField.Input placeholder="Password" type="password" size="3" /> */}
                </TextField.Root>

                <Flex justify="between" mt="1">
                  <Text size="2" color="gray">
                    Don't have an account? <Text color="blue">Sign up</Text>
                  </Text>
                  <Text size="2" color="blue">
                    Forgot password?
                  </Text>
                </Flex>

                <Button type="submit" size="3" mt="2">
                  Sign In
                </Button>
              </Flex>
            </Flex>
          </Card>
        </form>
      </Container>
    </Flex>
  );

  console.log(11122233);
  //   const formActionHandler = async (formData: FormData) => {
  //     "use server";

  //     const response = await fetch("http://sima.dev/api/users/signin", {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       body: JSON.stringify({
  //         email: "test3@test.com",
  //         password: "password",
  //       }),
  //     });
  //     const bla = await response.json();
  //     console.log(bla);
  //   };
  // return (
  //   <div>
  //     <h1>Logidddnss</h1>
  //     <form
  //       onSubmit={ async (e) => {
  //         e.preventDefault();
  //       }}
  //     >
  //       <input type="email" name="email" />
  //       <input type="text" name="password" />
  //       <button type="button" onClick={async() => {
  //         const response = await fetch("https://sima.dev/api/users/signin", {
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //           method: "POST",
  //           body: JSON.stringify({
  //             email: "test3@test.com",
  //             password: "password",
  //           }),
  //         });
  //         const bla = await response.json();
  //         console.log(bla);
  //       }}>dd</button>
  //     </form>
  //   </div>
  // );
};

export default LoginPage;
