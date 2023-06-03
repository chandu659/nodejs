let fs = require('fs')
let http = require('http')
let server = http.createServer((req,res)=>{
    res.write('<h1>Welcome to nodeJS http server</h1>')
    res.end()

})
server.listen(7310)