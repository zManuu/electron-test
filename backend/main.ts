import { app, BrowserWindow } from 'electron'
import { writeFileSync } from 'fs'
import * as Emit from '../shared/Emit'

let window: BrowserWindow | undefined

async function createWindow() {
    const browserWindow = new BrowserWindow({ width: 800, height: 600 })
    await browserWindow.loadFile('target/frontend/index.html')
    window = browserWindow
}

function emitToWindow<T extends keyof Emit.NodeToWindow>(key: T, value: Emit.NodeToWindow[T]) {
    if (!window) {
        console.error(`Couldn\'t emit ${key} to window because window isn't defined.`)
        return
    }

    console.log(`Emitting to window: ${key} (value: ${value})...`)
    window.emit(key, value)
}

async function launchApp() {
    emitToWindow('test', 'abc')
}

app.whenReady()
    .then(createWindow)
    .then(launchApp)
