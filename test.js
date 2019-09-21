const Flutter = require("./index.js");

Flutter.isInstalled((out)=>{
  if(out){
    console.log("Flutter is installed.")
  }else{
    console.log("Flutter is not installed.")
  }
})

Flutter.getDevices(function (array, err) {
    if (err) {
        console.log(err)
        return err;
    }
    Flutter.run({
        path: "C:\\Users\\username\\Desktop\\flutter_app",
        id: array[0][1]
    }, function (output, err) {
        if (err) {
            console.log(err)
            return err;
        }
        console.log(output)
    })
})
