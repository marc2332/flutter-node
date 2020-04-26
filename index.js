
/*
 *
 * MIT License
 *
 * Copyright (c) Marc Espín Sanz
 *
 * Full license on License.md
 *
 */
function isInstalled(){
	return new Promise((resolve, reject) => {
		const { exec } = require('child_process');
		exec('flutter', out => {
			resolve( !out )
		});
	})
}

function getDevices(){
	return new Promise((resolve, reject) => {
		const { exec } = require('child_process');
		const process = exec('flutter devices');
		parsingDevices( process ).then( devices => {
			resolve({
				msg: devices.length == 0 ? 'No devices found.' : 'Found devices:',
				devices: devices
			})
		})
	});
}

function app({ path, deviceId }){
	let execProcess;
	return {
		run({ onData = ()=>{}, onExit = ()=>{}, onClose = ()=>{} } = {}) {
			const { exec } = require("child_process");
			execProcess = exec(`cd ${path} && flutter run -d ${deviceId}`);
			execProcess.stdout.on('data', data => {
				onData(data)
			})
			execProcess.stdout.on('exit', data => {
				onExit(data)
			})
			execProcess.stdout.on('close', data => {
				onClose(data)
			})
		},
		reload: () => {
			execProcess.stdin.write('r')
		},
		close: () => {
			execProcess.stdin.write('q')
		}
	}
}

function parsingDevices(process){
	let devices = []
	let devicesCount = 0
	return new Promise( (resolve, reject) => {
		process.stdout.on('data', data => {
			const device = getDevice(data,devicesCount)
			if( device.totalDevices ){
				devicesCount = device.totalDevices
			}else if( device[0] ){
				devices.push({
					name: device[0].trim(),
					id: device[1].trim(),
					arch: device[2].trim(),
					api: device[3].trim(),
				})
			}
			if( devicesCount == devices.length && device.parsed !== false ){
				resolve(devices)
			}   
		});
	})
}

function getDevice(data,count){
	const splittedData = data.split('•')
	if( !splittedData[0].match('^Waiting') ){
		if( count == 0 ){
			const char = splittedData[0][0]
			return {
				totalDevices : char.match('N') ? 0 : Number(char)
			}
		}else{
			return splittedData
		}
	}else{
		return {
			parsed: false
		};
	}
}

module.exports = {
	isInstalled,
	getDevices,
	app
}