import { settings, writeSettings } from '../../../data/settings'

export default function handler(req: { method: string; body: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; data?: { vacations: number[]; yearSize: number; workDays: number; batchSize: number; maxOccurrences: number; days: string[] }; message?: string }): void; new(): any } }; end: () => void }) {

    if(req.method === 'GET') {
        res.status(200).json({ success: true, data: settings })
    } else if (req.method === 'POST') {
        const newSettings = req.body

        newSettings.vacations.sort((a: number, b: number) => a - b)

        Object.assign(settings, newSettings)
        
        writeSettings()

        res.status(200).json({ success: true, data: settings })
    }
    else {
        res.status(401).json({ success: false, message: 'Not allowed' })
    }

    res.end()
}