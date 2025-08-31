import connectDB from "@/lib/mongo/mongodb";


export async function GET() {
  await connectDB();
  return Response.json({ message: process.env.NODE_ENV })
  }






