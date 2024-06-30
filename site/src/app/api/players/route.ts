import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams
    if (!searchParams) {
      return Response.json({data: []})
    }
    const name = searchParams.get('name')
    if (!name || name.length < 4) {
      return Response.json({data: []})
    }

  const response = await fetch(`https://supervive.io/api/search?query=${name}`)

  if (!response.ok) {
    return Response.error()
  }

  const data = await response.json()
  const players = data.map((player: {u: string, d: string}) => ({Name: player.d, id: player.u})).slice(0, 3)

  return Response.json({data: players})
}