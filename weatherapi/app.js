//let express = require('express');
import express from 'express';
//let request  = require('request');
import request from 'request';

let port = process.env.PORT ||7660
let app =express();

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/weather',(req,res)=>{
    let city = req.query.city?req.city:'Hyderabad';
    let url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    //api calling 
    request (url,(err,response)=>{
        if (err) throw err;
        const OUTPUT = JSON.parse(response.body);
        res.render('index',{title:'Weather App',result:OUTPUT})
        //res.send(OUTPUT)
    })
})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on ${port}`);
})
