let express = require('express');
let app = express();
let cors = require('cors');
let request = requrie('request');
let superagent = require('superagent');
let port = process.env.PORT || 9111;

app.use(cors())

app.listen(port,() =>{
    console.log(`listening on port ${port}`)
})