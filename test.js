const Flutter = require("./index.js");

Flutter.getDevices(function (array, err) {
    if (err) {
        console.log(err)
        return err;
    }
    console.log(array)
    Flutter.run({
        path: "C:\\Users\\mespi\\Desktop\\test_marc",
        id: array[0][1]
    }, function (output, err) {
        if (err) {
            console.log(err)
            return err;
        }
        console.log(output)
    })
})