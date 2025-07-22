import { NextRequest } from 'next/server';
import { ablyServer } from '@/app/utils/ablyServer';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const contestId = searchParams.get("contestId");
  const userId = searchParams.get("userId");

  if (!contestId || !userId) {
    return new Response(JSON.stringify({ error: "Missing contestId or userId" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const tokenRequest = await ablyServer.auth.createTokenRequest({
      capability: JSON.stringify({
        [`contest-${contestId}`]: ["subscribe"],
      }),
      clientId: userId,
      ttl: 1000 * 60 * 60,
    });

    return new Response(JSON.stringify(tokenRequest), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch{
    return new Response(JSON.stringify({ error: "Failed to create token" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
