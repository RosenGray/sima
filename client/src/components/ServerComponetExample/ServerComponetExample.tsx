import { Card } from "@radix-ui/themes";
import Header from "@/components/Header/Header";
import { Counter } from "../Counter/Counter";

const getPosts = async () => {

  try {
       await new Promise((resolve) => setTimeout(resolve,5000));
    // Simulate an error after 5 seconds
    // await new Promise((resolve, reject) =>
    //   setTimeout(() => {
    //     reject(new Error("this is an error")); // Wrap 
    //   }, 5000)
    // );

    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error("Error:", error);
    // Handle the error or rethrow it
    throw error; // Re-throw if you want the caller to handle it
  }
};

const ServerComponetExample = async () => {
  console.log("ServerComponetExample");
  const posts = await getPosts();
  return (
    <div>
      <h1>ServerComponetExample</h1>
      <Counter/>

      <Card style={{ width: 400, height: 400 }}>
        {posts.map((x) => {
          return (
            <div key={x.id}>
              <p style={{ color: "red" }}>{x.title}</p>
              <p>{x.userId}</p>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default ServerComponetExample;
