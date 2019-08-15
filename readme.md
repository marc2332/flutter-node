# Flutter-Node

A NodeJS module to interact with the FLutter SDK

Working now:

* Get an array of the connected devices
* Run an app from the source

## Installation
Using npm:

```
npm install flutter-node
```

## Usage:

### getDevices()

If there are no devices connected it will return an error.

If there are devices connected it will return an array with arrays which refers to each device.

`javascript

    Flutter.getDevices(function(list,err){
        /*
            Example:
            [
                [Phone Name],
                [2g19a281],
                [android-arm64],
                [Android 9 (API 28)\n]
            ]


        */
    })

`

### run()

You must pass the app source code directory, and the device id (which you can get with the getDevices() method.)

`javascript

    Flutter.run({
        path:app_source_code_directory,
        id:device_id 
    },function(output,err){

    })
`

## Example:

`javascript

const Flutter = require("flutter-node");

Flutter.getDevices(function(array,err){
    if(err){
        console.log(err)
        return err;
    }
    Flutter.run({
        path:"C:\\Users\\mespi\\Desktop\\test_marc",
        id:array[0][1]
    },function(output,err){
        if(err) {
            console.log(err)
            return err;
        }
        console.log(output)
    })
})

`


Made by Marc Espin