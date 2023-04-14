const child_process = require('child_process')
const exec = child_process.exec
const execFile = child_process.execFile
const spawn = child_process.spawn



// exec wala command shell ko background mein kholke usme command execute krwata haixs
// exec("python test.py", (error, stdout, stderr)=>{
//        if(error)
//        {
//         console.log(error.message)
//         return
//        }
//        if(stderr)
//        {
//           console.log(stderr)
//           return
//        }
//       console.log(stdout)

// })


// execfile ek bash file ko execute krwata hai
// execFile("./script.sh", (error, stdout, stderr)=>{
//            if(error)
//            {
//             console.log(error.message)
//             return
//            }
//            if(stderr)
//            {
//               console.log(stderr)
//               return
//            }
//           console.log(stdout)
//     })



let process = spawn("python", ["test.py"])



process.stdout.on('data', (data)=>{
    console.log("Data", data.toString())
})


process.stderr.on('data', (data)=>{
    console.log("Error", data.toString())
})


process.on('exit', (code, signal)=>{
    console.log(code)
   // console.log(signal)
})

