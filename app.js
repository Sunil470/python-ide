const express = require('express')
const app = express()
let {exec} = require('child_process')
let fs = require('fs')
const { stdout, stderr } = require('process')
let uuid = require('uuid').v4

app.use(express.json())
app.set("view engine", "ejs")


app.post("/send", (req,res)=>{
    let code = req.body.code
    let filename = uuid() + ".py"
    fs.writeFile("./uploads/" + filename, code, (err)=>{
        if(err)
        {
              return res.json({sol: "Server side error"})
        }
        else
       {
           

          exec("python ./uploads/" + filename, (error, stdout, stderr)=>{
                  if(error)
                  { fs.unlink("./uploads/"+ filename, (err)=>{
                    if(err)
                    console.log(err)
                    else
                    console.log("File deleted successfully")
                 })
                    return res.json({sol: error.message})
                  }

                  if(stderr)
                  { fs.unlink("./uploads/"+ filename, (err)=>{
                    if(err)
                    console.log(err)
                    else
                    console.log("File deleted successfully")
                 })
                    return res.json({sol: stderr.message})
                  }




                 res.json({sol: stdout})
                 fs.unlink("./uploads/"+ filename, (err)=>{
                    if(err)
                    console.log(err)
                    else
                    console.log("File deleted successfully")
                 })
          })
  












       }
    })

})



app.get("/", (req,res)=>{
    res.render("index")
})







app.listen(3000, ()=>{
    console.log("Server is running on PORT: "+ 3000)
})