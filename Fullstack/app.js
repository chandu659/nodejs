let express = require('express');
let app = express();
let categoryRouter = require('./src/controllers/categoryRouter.js');
let productRouter = require('./src/controllers/productRouter.js');


let port = 8812;

app.get('/',function(req,res){
    res.send('Hi From Express Default Route')
})

app.use('/category',categoryRouter)
app.use('/products',productRouter)

//create server
app.listen(port,function(err){
    if(err) throw err
    console.log(`Server is running on port ${port}`)
})