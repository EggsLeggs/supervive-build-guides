import { directus } from "@/app/_lib/directus"
import { readItems } from "@directus/sdk"
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){

  const generateFilter = () => {
    const searchParams = req.nextUrl.searchParams

    let filter = {}
    if (searchParams.get('name')) {
      filter = {
        Name: {
          _contains: `%${searchParams.get('name')}%`
        }
      }
    }
    return filter
  }

  const hunters = await directus.request(
    readItems('Hunters',
      {
        filter: generateFilter(),
        fields: ["Name"],
        limit: 3
      }
    )
  )

  return Response.json({data: hunters})
}