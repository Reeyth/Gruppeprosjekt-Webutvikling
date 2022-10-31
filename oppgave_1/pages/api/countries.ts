// TODO: Her er det bugs
import { countries } from '../../data/countries';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const country = countries[Math.floor(Math.random() * countries.length)]
  return res.status(404).json({ success: true, data: country })
}
