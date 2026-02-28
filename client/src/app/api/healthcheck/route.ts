export async function GET() {
  return Response.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Force static to avoid streaming
export const dynamic = 'force-static';