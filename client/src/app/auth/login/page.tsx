"use client";
import {
  useForm,
  getFormProps,
  getInputProps,
  useInputControl,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
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
import { createUser, handleImage } from "../-/actions";
import { loginSchema } from "../-/validations";


const LoginPage = () => {
  // const [lastResult, action] = useFormState(createUser, undefined);
  // const [form, fields] = useForm({
  //   defaultValue: {
  //     firstName: "vladi",
  //   },
  //   lastResult,
  //   onValidate: ({ formData }) => {
  //     return parseWithZod(formData, { schema: loginSchema });
  //   },
  //   shouldRevalidate: "onInput",
  //   shouldValidate: "onInput",
  // });

  // const { firstName, email } = fields;
  // const first = useInputControl(fields.firstName);
  // console.log("form", form);
  // console.log(
  //   "inoutprotops",
  //   getInputProps(fields.firstName, { type: "text" })
  // );
  // console.log("lastResult", lastResult);
  // console.log("fields", fields.firstName.name);
  // console.log('first',first)


  return (

    <div>
      <form action={handleImage}>

         <input type="file" name="image"/>
         <button>Handle Image</button>
      </form>
    </div>
    // <Flex
    //   justify="center"
    //   align="center"
    //   style={{ minHeight: "100vh" }}
    //   className="bg-gradient-to-r from-blue-50 to-indigo-50"
    // >
    //   <Container size="1">
    //     <form action={action} {...getFormProps(form)}>
    //       <Card size="4">
    //         <Flex direction="column" gap="5" p="6">
    //           <Flex direction="column" gap="3" align="center">
    //             <Heading size="8" align="center" mb="2">
    //               Welcome Back
    //             </Heading>
    //             <Text size="3" color="gray">
    //               Sign in to continue to your account
    //             </Text>
    //           </Flex>

    //           <Flex direction="column" gap="4">
    //             <TextField.Root
    //               {...getInputProps(fields.firstName, { type: "text" })}
    //               key={firstName.key}
    //               // onChange={handleInputChange}
    //               value={first.value}
    //               onChange={(e) => first.change(e.target.value)}
    //               placeholder="First Name"
    //             >
    //               <TextField.Slot>
    //                 <PersonIcon height="16" width="16" />
    //               </TextField.Slot>
    //             </TextField.Root>
    //             <p>{firstName.errors}</p>
    //             <TextField.Root
    //               name={email.name}
    //               defaultValue={email.initialValue}
    //               key={email.key}
    //               type="text"
    //               placeholder="Email address"
    //             >
    //               <TextField.Slot>
    //                 <PersonIcon height="16" width="16" />
    //               </TextField.Slot>
    //             </TextField.Root>

    //             <TextField.Root
    //               name="password"
    //               placeholder="Password"
    //               type="text"
    //             >
    //               <TextField.Slot>
    //                 <LockClosedIcon height="16" width="16" />
    //               </TextField.Slot>
    //               {/* <TextField.Input placeholder="Password" type="password" size="3" /> */}
    //             </TextField.Root>

    //             <Flex justify="between" mt="1">
    //               <Text size="2" color="gray">
    //                 Don't have an account? <Text color="blue">Sign up</Text>
    //               </Text>
    //               <Text size="2" color="blue">
    //                 Forgot password?
    //               </Text>
    //             </Flex>

    //             <Button type="submit" size="3" mt="2">
    //               Sign In
    //             </Button>
    //           </Flex>
    //         </Flex>
    //       </Card>
    //     </form>
    //   </Container>
    // </Flex>
  );

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
