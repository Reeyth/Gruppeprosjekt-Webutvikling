import settingsFile from '../data/settings.json'

export let settings = settingsFile.settingsJson.settings
export const defaultSettings = settingsFile.settingsJson.defaultSettings

// Write settings to json file
export function writeSettings() {
    const fs = require('fs')
    const path = require('path')
    const filePath = path.join(process.cwd(), 'data', 'settings.json')
    const data = JSON.stringify({ settingsJson: {settings, defaultSettings } }, null, 2)
    fs.writeFileSync(filePath, data)
}

export function restoreSettings() {
    settings = { ...defaultSettings }
}