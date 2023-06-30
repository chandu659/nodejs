import express from 'express';
//import axios from 'axios';
let port = 7011;
let app = express();

import { createClient } from 'redis';
import { MongoClient} from 'mongodb';
const url ="mongodb://127.0.0.1:2701"
const mclient = new MongoClient(url);
const client = createClient({
    password: '4SduFFfZYM96fanhdsCovrtrH7FHeo6V',
    socket: {
        host: 'redis-15542.c273.us-east-1-2.ec2.cloud.redislabs.com',
        port: 15542
    }
});

client.on('error',err=> console.log(`Redis Client Error`,err));

// connecting to mongo

async function main(){
    await mclient.connect()
}
const collection = mclient.db('users').collection('products')
app.get('/data', async(req,res) => {
    await client.connect();
    let userInput = req.query.color.trim();
    userInput = userInput?userInput:'White';
    let result = await client.get(userInput)
    if(result){
        const output = JSON.parse(result);
        res.send(output)
    }else{
        const output =[];
        const cursor = collection.find({color:userInput});
        for await (const data of cursor ){
            output.push(data)
        }
        
        await client.set(userInput,JSON.stringify({source:'Redis Cache',output}),{EX:10,NX:true})
        res.send({source:'MongoDB',output})
    }

    await client.disconnect()
})

app.listen(port,() =>{
    main()
    console.log(`Running on port ${port}`)
})
