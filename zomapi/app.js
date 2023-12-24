let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let authkey = "node"+ process.env.KEY;
let mongo = require('mongodb');
let {dbConnect,getData, getDataSort,getDataSortSkip, postData, 
deleteData, updateData} = require('./controllers/dbcontroller');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())

// Default route
app.get('/',(req,res)=>{
    res.status(200).send("Health ok")
})

function auth(key){
    if (key== authkey){
        return true
    }
    else{
        return false
    }
}

//get location
app.get('/location',async(req,res)=>{
    let userKey  = req.header('basic-token');
    if (auth(userKey)){
        let query ={};
        let collection = "location";
        let output = await getData(collection,query);
        res.send(output);
    }else{
        res.send("Un authenticated user")
    }
})


//get restaurants
app.get('/restaurants',async(req,res)=>{
    let query={};
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);
    let restaurantId = Number(req,query.restaurantId);
    let userKey  = req.header('basic-token');
    if (auth(userKey)){
        if(mealId && stateId){
            query = {
                "mealTypes.mealtype_id": mealId,
                state_id:stateId
            }
        }
        else if(mealId){
            query ={
                "mealTypes.mealtype_id": mealId
            }
        }
    
        else if(stateId){
            query = {
                state_id:stateId
            }
        }
        else if(restaurantId)
        {
            query = {
                "restaurants.restaurant_id" :restaurantId
            }
        }
        let collection = "restaurants";
        let output = await getData(collection, query)
        res.send(output);
    }else{
        res.send("Un authenticated user")
    }
    
})

//filters
app.get('/filters/:mealId',async(req,res) => {
    let query = {};
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let sort = {cost:1};
    let skip = 2;
    let limit = 1000000;
    
    if(req.query.skip && req.query.limit){
        skip=Number(req.query.skip);
        limit=Number(req.query.limit);
    }
    if(req.query.sort){
        sort={cost:req.query.sort}
    }
    if(cuisineId){
        query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }else if(lcost && hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    let collection = "restaurants";
    let output = await getDataSortSkip(collection,query,sort,skip,limit);
    res.send(output);
})

//get details of the restaurant by id or mongo object id
app.get('/restaurantDetails/:id', async(req,res)=>{
    
    let id = Number(req.params.id);
    let mealId = Number(req.params.mealId);
    let query ={};

    if (id){
        query = {"restaurant_id":id};
    }

    //let _id = mongo.ObjectId(req.params.id);
    //let query ={_id};
    let collection = "restaurants";
    let output = await getData(collection, query);
    res.send(output);
})

//get menu of restaurant
app.get('/menu/:id',async(req,res)=>{
    let  id = Number(req.params.id);
    let menuId = Number(req.params.menuId);
    let query = {restaurant_id:id};
    if (menuId) {
        query = {"menu.menu_id":menuId};
    }
    let collection = "menu";
    let output = await getData(collection, query);
    res.send(output);

})


//menu details {"id":[4,3,5]}
app.post('/menuDetails',async(req,res)=>{
    if(Array.isArray(req.body.id)){
        let query = {menu_id:{$in:req.body.id}};
        let collection = "menu";
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please pass data as array like {"id":[4,3,5]}')
    }
})

//place order 
app.post('/placeOrders',async(req,res)=>{
    let data = req.body;
    let collection = "orders";
    let response = await postData(collection, data)
    res.send(response)
})

// get order details wrt to email
app.get('/orders', async(req,res)=>{
    let query ={};
    let collection = "orders";
    if (req.query.email){
        query = {email:req.query.email}
    }
    let output = await getData(collection, query)
    res.send(output)
})

//get list of meals
app.get('/mealType',async(req,res)=>{
    let query ={};
    let collection = "mealType";
    let output = await getData(collection,query);
    res.send(output);
})



//update data
app.put('/updateOrder', async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateData(collection,condition,data)
    res.send(output)
})

//delete orders
app.delete('/deleteOrder', async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":mongo.ObjectId(req.body._id)}
    let rowcount = await getData(collection,condition)
    if(rowcount.length >0){
        let response = await deleteData(collection,condition)
        res.send(response)
    }else{
        res.send("no record found")
    }
})

//port
app.listen(port,()=>{
    dbConnect()
    console.log(`listening on port ${port}`)

})