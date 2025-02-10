export const getPosts = async () => {
  console.log("getPosts in server");
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
  }
  
  export const getComments = async () => {
    console.log("getComments in server");
    const response = await fetch('https://jsonplaceholder.typicode.com/comments')
    return response.json()
  }
  