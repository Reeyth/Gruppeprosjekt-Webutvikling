import { settings } from '../../../data/settings'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(    
    req: NextApiRequest,
    res: NextApiResponse) {

    if(req.method === 'GET') {
        res.status(200).json({ success: true, data: settings.vacations })
    }
    else {
        res.status(401).json({ success: false, message: 'Not allowed' })
    }

    res.end()
}