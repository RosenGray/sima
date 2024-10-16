'use client'

import Header from '@/components/Header/Header'
import Accessibilik from 'accessibility-react-widget'
import styles from './page.module.css'
import { AlertDialog, Avatar, Box, Button, Card, Flex,Text } from '@radix-ui/themes'

export default function Home() {
  return (
    <div className={styles.Page}>
      <Header />
      <main>main

      <Card style={{width:400,height:400}}>
dffdsfsdfdsf

  </Card>


  <AlertDialog.Root>
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
</AlertDialog.Root>

      </main>
      <Accessibilik />
    </div>
  )
}
