let mongo = require('mongo');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.mongoUrl;
let db;

function dbConnect(){
    MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,client) => {
        if(err) console.log(`Error While Connecting`);
        db = client.db('iusers')
    });
}

async function getdata(){
    let output;
    try{
        output= await db.collection(colName).find(quey).toArray();
    }
    catch(err){
        output = {"Error":`Err while connecting to ${colName}`}
    }
    return output
}

module.exports = {
    dbConnect,
    getdata
}