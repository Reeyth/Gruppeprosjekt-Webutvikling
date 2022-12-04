import { settings, writeSettings } from '../../../data/settings'

export default function handler(req, res) {

    if(req.method === 'GET') {
        res.status(200).json({ success: true, data: settings.vacations })
    }
    else {
        res.status(401).json({ success: false, message: 'Not allowed' })
    }

    res.end()
}