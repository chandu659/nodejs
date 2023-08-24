let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let dbConnect = require('./controllers/dbcontroller');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())


app.listen(port,()=>{
    dbConnect()
    console.log(`listing on port${port}`)

})

