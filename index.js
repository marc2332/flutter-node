/*
 *
 * MIT License
 *
 * Copyright (c) Marc Espín Sanz
 *
 * Full license on License.md
 *
 */


module.exports = {
   run(object,callback){
    const { exec } = require('child_process');
    exec(`flutter`,(err)=>{
        if(err){
            callback(undefined,err)
        }
    })
    const command = exec(`cd ${object.path} && flutter run -d ${object.id}`);
    let times = 0;
    command.stdout.on('data', (data) => {
        times ++
        callback(data,undefined)
    });
    command.on('close', (code) => {
        if(code==0) return;
    });
    command.on('exit', (code) => {
        if(code==0) return;
        
    });
   },
   getDevices(callback){
        const { exec } = require('child_process');
        const command = exec(`flutter devices`);

        let devices =[];
        let times = 0;
        let loop_times = 0;
        let _break =false;
        async function loop() {
            if(_break) return;
            setTimeout(function(){ loop()}, 1);
            if(loop_times<times ){
                loop_times ++;
            }else if(times>1){
                _break = true;
                return callback(devices)
            }  
        }
        loop();
        command.stdout.on('data', (data) => {
            if(data.match('^No')){
                if(devices.length == 0){
                    _break = true;
                    return callback([],"No devices detected.");
                }
                return;
            }
            times++;
            if(times==1) return;
            const parsed = data.split("•");
            devices.push(parsed)
        })
   }
}