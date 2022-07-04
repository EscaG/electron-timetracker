import {autoUpdater} from 'electron-updater'
import {dialog} from 'electron'

autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = "info"
autoUpdater.autoDownload = false

export const checkForUpdates = () => {

	autoUpdater.checkForUpdates() // check for updates on GH

	autoUpdater.on('update-available', () => {
		// Show download prompt
		dialog.showMessageBox({
			type: 'info',
			title:'Update available',
			message:'A new version is available. Do you want to download and install is now?',
			buttons:['Yes','No']
		}).then(({response})=>{
			if (response === 0){
				autoUpdater.downloadUpdate()
			}
		})
	})

	autoUpdater.on('update-downloaded',()=>{
		dialog.showMessageBox({
			type:'info',
			title:'Update ready',
			message:'Install and restart now?',
			buttons:['Yes','Later']
		}).then(({response})=>{
			if (response === 0){
				autoUpdater.quitAndInstall(false, true)
			}
		})
	})

}