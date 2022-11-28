// TODO: Her er det bugs
import { countries } from '../../data/countries';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const country = countries[Math.floor(Math.random() * countries.length)]
  
// CHANGE: changed from 400 to 200
  return res.status(200).json({ success: true, data: country })
}
