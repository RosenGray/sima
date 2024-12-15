
import { Suspense } from 'react'

import Header from "@/components/Header/Header";
import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import ServerComponetExample from "@/components/ServerComponetExample/ServerComponetExample";
import Loader from './loading';
import FormExample from '@/components/FormExample/FormExample';
export default function Home() {
  // const [data, setData] = useState<any>([]);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos")
  //     .then((response) => response.json())
  //     .then((json) => setData(json));
  // }, []);

  return (
    < main className={styles.Page}>
      {/* <Header /> */}
      {/* <main className={styles.Main}> */}
        main
        {/* <Card style={{ width: 400, height: 400 }}>
          {data.map((x) => {
            return (
              <div key={x.id}>
                <p style={{ color: "red" }}>{x.title}</p>
                <p>{x.userId}</p>
              </div>
            );
          })}
        </Card> */}
        <FormExample/>
        <Suspense fallback={<Loader/>}>
        <ServerComponetExample/>
        </Suspense>

        {/* <ServerComponetExample/> */}

        {/* <Suspense fallback={<Loader/>}>
        <ServerComponetExample/>
        </Suspense> */}

        {/* <ServerComponetExample/> */}
        
        {/* <AlertDialog.Root>
  <AlertDialog.Trigger>
    <Button color="red">Revoke access</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content maxWidth="450px">
    <AlertDialog.Title>Revoke access</AlertDialog.Title>
    <AlertDialog.Description size="2">
      Are you sure? This application will no longer be accessible and any
      existing sessions will be expired.
    </AlertDialog.Description>

    <Flex gap="3" mt="4" justify="end">
      <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button variant="solid" color="red">
          Revoke access
        </Button>
      </AlertDialog.Action>
    </Flex>
  </AlertDialog.Content>
</AlertDialog.Root> */}
      {/* </main> */}
    </main>
  );
}
