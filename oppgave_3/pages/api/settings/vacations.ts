import { settings, writeSettings } from '../../../data/settings'
import settingsJson from '../../../data/settings.json'

export default function handler(req, res) {

    if(req.method === 'GET') {
        res.status(200).json({ success: true, data: settings.vacations })
    } else if (req.method === 'POST') {
        const id = req.body.id

        if(!id) {
            return res.status(400).json({ success: false, message: 'Id missing' })
        }

        if(id > 52 || id < 1) {
            return res.status(400).json({ success: false, message: 'Id out of range (1-52)' })
        }

        if(settings.vacations.includes(id)) {
            return res.status(400).json({ success: false, message: 'Vacation already exists' })
        }

        settings.vacations.push(id)
        settings.vacations.sort((a, b) => a - b)

        res.status(200).json({ success: true, data: settings.vacations })
        writeSettings()
    }
    else {
        res.status(401).json({ success: false, message: 'Not allowed' })
    }

    res.end()
}