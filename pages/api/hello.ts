// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

const Hello = (request: NextApiRequest, response: NextApiResponse) => {
  response.status(200).json({ name: "John Doe" })
}

export default Hello
