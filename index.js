
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
    const { exec } = require("child_process");
    exec(`flutter`, out => {
      resolve(!out)
    });
  })
}

function getDevices(){
  return new Promise((resolve, reject) => {
    const { exec } = require("child_process");
    const process = exec(`flutter devices`);

    const instance = new parsingDevices(process)

    instance.then(function(devices){
      resolve({
        msg:devices.length == 0?'No devices found.':'Found devices:',
        devices:devices
      })
    })
  });
}

function app({
  path,
  deviceId
}){
  
  const me = this;

  return {
    run({
      onData = ()=>{},
      onExit = ()=>{},
      onClose = ()=>{}
    }){
      const { exec } = require("child_process");
      me.process = exec(`cd ${path} && flutter run -d ${deviceId}`);

      me.process.stdout.on("data", data => {
        onData(data)
      })
      me.process.stdout.on("exit", data => {
        onExit(data)
      })
      me.process.stdout.on("close", data => {
        onClose(data)
      })
    },
    reload(){
      me.process.stdin.write('r')
    }
  }
}

function parsingDevices(process){

  let devices = []
  let devicesCount = 0

  const p = new Promise((resolve, reject) => {
    process.stdout.on("data", data => {

      const device = getDevice(data,devicesCount)

      if(device.totalDevices != undefined){
        devicesCount = device.totalDevices
      }else if(device[0]!=undefined){
        devices.push({
          name:device[0],
          id:device[1],
          arch:device[2],
          api:device[3],
        })
      }
      if(devicesCount == devices.length ){
        resolve(devices)
      }   
    });
  })

  return p
}

function getDevice(data,count){
  const splittedData = data.split('•')
  if(!splittedData[0].match('^Waiting')){
    if(count == 0){
      const char = splittedData[0][0]
      return {
        totalDevices : char.match('N')?0:char
      }
    }else{
      return splittedData
    }
  }else{
    return "";
  }
}

module.exports = {
  isInstalled,
  getDevices,
  app
};