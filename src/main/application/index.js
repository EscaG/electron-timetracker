import {app, BrowserWindow, ipcMain, Menu} from 'electron';
import path from 'path';
import {Storage} from './storage';
import {Timer} from "./timer";
import {nanoid} from "nanoid";
import {DateTime} from "luxon";


export default class TimerApp {
	constructor () {
		this.timer = new Timer()
		this.storage = new Storage()
		this.entry = {};
		this.subscribeForAppEvents()
		this.subscribeForIPC()
		app.whenReady().then(() => this.createWindow())
	}


	createWindow () {
		let mainMenu = Menu.buildFromTemplate([{role:'about'}])
		this.window = new BrowserWindow({
			title: CONFIG.name,
			width: CONFIG.width,
			height: CONFIG.height,
			minWidth: CONFIG.width,
			minHeight: CONFIG.height,
			maxWidth: CONFIG.width,
			maxHeight: CONFIG.height,
			// titleBarStyle: 'hidden',
			titleBarOverlay: {
				color: '#3498db'
			},
			resizable: false,
			show: false,
			icon: __dirname + '../../../resources/pulse.png',
			webPreferences: {
				// contextIsolation: false,
				// nodeIntegration: true,
				// worldSafeExecuteJavaScript: true,
				preload: path.join(app.getAppPath(), 'preload', 'index.js')
			}
		})
		this.window.loadFile('renderer/index.html');

		this.timer.onChange = () => {
			this.window.webContents.send('tick', {time: this.timer.get()})
		}
		this.window.on('ready-to-show', () => {
			this.window.show();
			Menu.setApplicationMenu(mainMenu)
		})
		this.window.webContents.on('did-finish-load', () => {
			this.window.webContents.send('entries',
				{
					title: this.entry.title,
					time: this.timer.get(),
					entries: this.storage.get('entries'),
				})
		})
		this.window.on('closed', () => {
			this.timer.onChange = null
			this.window = null
		})
		// this.window.webContents.openDevTools({mode: 'detach'})

	}

	subscribeForAppEvents () {
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		})

		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) {
				this.createWindow()
			}
		})
	}

	subscribeForIPC () {
		ipcMain.on('timer:start', (_, data) => {
			this.timer.start()
			this.entry = {
				id: nanoid(),
				duration: 0,
				title: data.title,
				project: 'none',
				createAt: DateTime.local().toISO()
			}
		})
		ipcMain.on('timer:stop', () => {
			const duration = this.timer.stop()
			this.entry.duration = duration;
			this.saveEntry()
		})
		// ipcMain.on('save', (_, entry) => {
		// 	const entries = this.storage.get('entries') || []
		// 	entries.push(entry)
		// 	this.storage.set('entries', entries)
		// 	this.window.webContents.send('entries', {entries})
		// })
	}

	saveEntry () {
		const entries = this.storage.get('entries') || []
		entries.push(this.entry)
		this.storage.set('entries', entries)
		this.window.webContents.send('entries', {entries})
		this.entry = {}
	}

}















