import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';
let port = 7011;
let app = express();

let client = createClient({
    host: "localhost",
    port:6379
})

client.on('error',err=>console.log(`Redis client error`,err));

app.get('/data',async(req,res)=>{
    await client.connect();
    let userInput = req.query.country.trim();
    userInput = userInput?userInput:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    let result = await client.get(userInput)
    if(result){
        const output =JSON.parse(result);
        res.send(output)
    }
    else {
        let apiResponse = await axios.get(url);
        const output = apiResponse.data;
        await client.set(userInput,JSON.stringify({source:'Redis cache',output}),{EX:10,NX:true})
        res.send({source:"API response",output})
    }
    await client.disconnect()
})
app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})