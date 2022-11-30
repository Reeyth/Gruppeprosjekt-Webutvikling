import { settings } from '../../../data/settings'

export default function handler(req, res) {

    if(req.method === 'GET') {
        res.status(200).json({ success: true, data: settings.vacations })
    } else if (req.method === 'POST') {
        const { vacations } = req.body
        settings.vacations = vacations
        res.status(200).json({ success: true, data: settings.vacations })
    } else if (req.method === 'PUT') {
        const { vacations } = req.body
        settings.vacations = vacations
        res.status(200).json({ success: true, data: settings.vacations })
    }
    else {
        res.status(401).json({ success: false, message: 'Not allowed' })
    }

    res.end()
}