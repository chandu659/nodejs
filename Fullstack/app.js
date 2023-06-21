let express = require('express');
let app = express();
let fs =require('fs');
let categoryRouter = require('./src/controllers/categoryRouter.js');
let productRouter = require('./src/controllers/productRouter.js');
let dotenv = require('dotenv');
dotenv.config();
let morgan = require('morgan');
let port = process.env.PORT ||8812
const {dbConnect} = require('./src/controllers/dbcontroller')

let menu = [
    {link:'/',name:'Home'},
    {link:'/category',name:'Category'},
    {link:'/products',name:'Products'}
]

app.get('/',function(req,res){
    //res.send('Hi From Express Default Route')
    res.render('index',{title:'Home page'})
})

// static file path 
app.use(express.static(__dirname+'/public'));
//html file path
app.set('views','./src/views');
//view engine name
app.set('view engine','ejs');

// middle wear
app.use(morgan('combined',{stream:fs.createWriteStream('./app.log')}))

app.use('/category',categoryRouter)
app.use('/products',productRouter)

//create server
app.listen(port,function(err){
    dbConnect();
    if(err) throw err
    console.log(`Server is running on port ${port}`)
})