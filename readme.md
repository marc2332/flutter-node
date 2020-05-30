# Flutter-Node

A NodeJS package to interact with the FLutter SDK via CLI wrapping

Working now:

* Get an array of the connected devices
* Run an app from the source
* Hot reload the app

## Installation
Using npm:

```
npm install flutter-node
```

## Usage:

```javascript
const Flutter = require("flutter-node")
```

### isInstalled()

Detect if Flutter is intalled on the client:

```javascript
Flutter.isInstalled().then(res => {
    // res = false / true
})
```

### getDevices()

If there are no devices connected it will return an error.

If there are devices connected it will return an array with arrays which refers to each device.

```javascript

Flutter.getDevices().then( res => {
	/*
        res {
            msg:'Devices found:',
            devices:[
                {
                    name:'Some phone',
                    id:'ffffffff',
                    arch:'android-arm64',
                    api:'Android 9 (API 28)'
                }
            ]
        }


    */
})

```

### app()

You must pass the app source code directory, and the device id (which you can get with the getDevices() method.)

```javascript

const myApp = new Flutter.app({
    path:'/somewhere',
    deviceId:mydevice.id
})

myApp.run()

myApp.reload()

myApp.close()
```

## Example:

```javascript

const Flutter = require("flutter-node");

Flutter.isInstalled().then( result => console.log(result))

Flutter.getDevices().then( res => {
	if(res.devices.length >= 1){
		const myDevice = res.devices[0]
		const myApp = new Flutter.app({
			path:'/somewhere',
			deviceId:myDevice.id
		})
		myApp.run()
		setTimeout(()=>{
			myApp.reload()
		}, 25000);
		// myApp.reload()
	}
})

```
