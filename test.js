const Flutter = require("./index.js");

Flutter.isInstalled().then((result)=>console.log(result))

Flutter.getDevices().then(function(res){
	if(res.devices.length >= 1){
		const myDevice = res.devices[0]
		const myApp = new Flutter.app({
			path:'C:\\Users\\mespi\\Documents\\test_app',
			deviceId:myDevice.id
		})
		myApp.run({
			onData(stuff){
				console.log(stuff)
			}
		})
		setTimeout(()=>{
			myApp.reload()	
		}, 18000);
		
		//myApp.close()
	}
})
