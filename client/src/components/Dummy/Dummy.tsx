'use client'
import {  Button, } from '@radix-ui/themes'



const Dummy = () => {

  const fetchUser = async () => {
    const res = await fetch('/api/auth/currentuser')
    const data = await res.json()
    console.log('data,',data)
  }

  return (
    <div>
      <Button onClick={fetchUser}>
         Hello
      </Button>
    </div>
  )
}

export default Dummy
