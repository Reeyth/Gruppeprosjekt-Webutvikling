import { settings, writeSettings } from '../../../data/settings'

export default function handler(req: any, res: any) {

    if(req.method === 'GET') {
        res.status(200).json({ success: true, data: settings.yearSize })
    }
    else {
        res.status(401).json({ success: false, message: 'Not allowed' })
    }

    res.end()
}