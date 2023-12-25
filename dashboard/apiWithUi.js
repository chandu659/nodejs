const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const Mongo = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function main(){
    await client.connect()
}

const collection = client.db('user').collection('dashboard');
const bodyParser = require('body-parser');
const cors = require('cors');
const port =  process.env.PORT||7710;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//health check
app.get('/health', (req,res)=>{
    res.status(200).send('Health ok ')
})  

//get users based on query params 
app.get('/users', async (req,res)=>{
    let output=[];
    let query ={};
    if(req.query.role && req.query.city){
        query = {
            role: req.query.role,
            city: req.query.city,
            isActive:true
        }
    }
    else if (req.query.role){
        query ={
            role:req.query.role,
            isActive:true
        }
    }
    else if(req.query.city){
        query ={
            city:req.query.city,
            isActive:true
        }
    }
    else if (req.query.isActive){
        let isActive = req.query.isActive;
        if(isActive =="false"){
             return isActive = false
        }
        else{
            isActive = true
        }
    }
    else{
        query = {isActive:true}

    }
    const cursor = collection.find(query);
    for await(const data of cursor){
        output.push(data)
    }
    cursor.closed;
    res.send(output)
})

//update users
app.put('/updateUsers',async(req,res)=>{
    await collection.updateOne(
        {_id: new Mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                isActive:true
            }
        }
        )
    res.send("Record updates");
    
})

// deactivate user 
app.put('/deactivateUser', async(req,res)=>{
    await collection.updateOne(
        {_id: new Mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        }
    )
    res.send('Deactivated user')
})

//activate users
app.put('/activateUser', async(req,res)=>{
    await collection.updateOne(
        {_id: new Mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        }
    )
    res.send('Activated user')
})

// detele users
app.delete('/deleteUser',async(req,res)=>{
    await collection.deleteOne(
        {_id: new Mongo.ObjectId(req.body._id)}
    )
    res.send('user deleted')
})

// add users
app.post('/addusers',async(req,res)=>{
    await collection.insertOne(req.body);
    res.send("data added")
})


app.listen(port,()=>{
    main()
    console.log(`listening on port ${port}`)
})