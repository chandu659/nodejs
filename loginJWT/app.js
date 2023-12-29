
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db.js');
const port = process.env.PORT || 5000;

app.use(cors());


const AuthController = require('./controller/AuthController.js');

app.use('/api/auth',AuthController);

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})