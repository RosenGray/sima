
import { NextResponse } from "next/server";
export async function GET() {
    //todo: add auth check
    // This shows server-side env vars
    // For NEXT_PUBLIC_* vars, check client-side code - they're inlined at build time
    const nextPublicVars = Object.keys(process.env)
        .filter(key => key.startsWith('NEXT_PUBLIC_'))
        .reduce((acc, key) => {
            acc[key] = process.env[key];
            return acc;
        }, {} as Record<string, string | undefined>);
    
    return NextResponse.json({ 
        env: process.env,
        nextPublicVars,
        note: "NEXT_PUBLIC_* variables are inlined at BUILD TIME into the client bundle"
    });
}
