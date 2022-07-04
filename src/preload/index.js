import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('Entries', {
	onLoaded: callback => {
		ipcRenderer.on('entries', callback)
	}
})
contextBridge.exposeInMainWorld('Timer', {
	onLoaded: callback => {
		ipcRenderer.on('tick', callback)
	},
	onStart: (title) => {
		ipcRenderer.send('timer:start',title)
	},
	onStop: () => {
		ipcRenderer.send('timer:stop')
	},
	// saveEntry: (entry) => {
	// 	ipcRenderer.send('save',entry)
	// }
})

/**
 * ? такой принцип передачи данных работает только если contextIsolation
 *
window.startTimer =()=>{
  ipcRenderer.send('timer:start')
}

window.stopTimer =()=>{
  ipcRenderer.send('timer:stop')
}
 */


// window.subscribeForEntries = callback =>{
//   ipcRenderer.on('entries',callback)
// }