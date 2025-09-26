export async function GET() {
    return Response.json({ message: 'Files API is running' })
  }

export async function POST(request: Request) {
    const { files } = await request.json();
    return Response.json({ message: 'Files API is running' })
  }