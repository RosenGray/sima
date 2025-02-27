'use client'
import {  Button, } from '@radix-ui/themes'

// const fetchCurrentUserClient = async () => {
//   const response = await fetch("http://localhost:3000/api/auth/currentuser", {
//     credentials: "include",
//   });
//   return response.json();
// };


const Dummy = () => {

  const fetchUser = async () => {
    console.log('blaaAAAA');
    const res = await fetch('/api/auth/signout',{
      credentials: 'include',
      method: 'POST'
    })
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
