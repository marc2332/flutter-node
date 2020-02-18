const Flutter = require("./index.js");

Flutter.isInstalled().then((result)=>console.log(result))

Flutter.getDevices().then(function(res){

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
  }
})
