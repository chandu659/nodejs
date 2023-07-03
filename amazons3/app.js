const fs = require('fs');
const AWS = require('AWS');
require('dotenv').config();


const s3 = new AWS.S3({
    accesskeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})

const fileName = "download.jpeg";

const uploadFile = () =>{
    fs.readFile(fileName,(err,data)=>{
        if(err) throw err;
        const params ={
            BUCKET:'bucket',
            Key:`${Date.now().toString()}-${fileName}`,
            Body:JSON.stringify(data,null(),2)
        }
        s3.upload(params,function(err,data){
            if(err) throw err;
            console.log('Image uploaded')
        })
    })
}

uploadFile()