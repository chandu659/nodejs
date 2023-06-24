let express = require('express');
let redis = require('redis');
let axios = require('axios')
let port = process.env.PORT || 7622;
let app = express();


import { createClient } from 'redis';

const client = createClient({
    password: '4SduFFfZYM96fanhdsCovrtrH7FHeo6V',
    socket: {
        host: 'redis-15542.c273.us-east-1-2.ec2.cloud.redislabs.com',
        port: 15542
    }
});

app.get('/data',(req,res)=>{
    let userInput = req.query.country.trim();
    userInput = userInput?userInput:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    // check whether the data is in redis 
    return client.get(userInput,(err,result)=>{
        if (result){
            const output = JSON.parse(result);
            res.send(output)
        }
        else{
            // save data in the DB if its not in the redis 
            //get the data from db and save in the redis for the next time 
            axios.get(url)
                .then((response)=>{
                    // save the response in the redis for the next time 
                    const output = response.data;
                    client.setex(userInput,3600,JSON,stringify({source:"Redis cache",output}))
                    // for the firttime return the data
                    res.send({source:'API response',output})
                    
                })
        }
    })
})
app.listen(port,()=>{})