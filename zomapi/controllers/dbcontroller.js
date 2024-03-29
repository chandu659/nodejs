let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/users';
let db;

function dbConnect() {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.error(`Error while connecting to MongoDB: ${err}`);
            console.log(`mongoUrl: ${mongoUrl}`);

        } else {
            db = client.db('users');
            console.log('Connected to MongoDB successfully');
        }
    });
}

async function getData(colName,query){
    let output;
    try{
        output = await db.collection(colName).find(query).toArray();
    } catch(err){
        output = {"Error":`Error While fetching from ${colName}`};
    }
    return output
}

//get sorted data
async function getDataSort(colName,query,sort){
    let output;
    try{
        output = await db.collection(colName).find(query).sort(sort).toArray();
    } catch(err){
        output = {"Error":`Error While fetching from ${colName}`};
    }
    return output
}

//skip and limit the results
async function getDataSortSkip(colName,query,sort, skip, limit){
    let output;
    try{
        output = await db.collection(colName).find(query).sort(sort).skip(skip).limit(limit).toArray();
    } catch(err){
        output = {"Error":`Error While fetching from ${colName}`};
    }
    return output
}

//post data
async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insert(data)
    } catch(err){
        output = {'Error':`Error While fetching from ${colName}`}
    }
    return output
}

// update data

async function updateData(colName, condition, data){
    let output;
    try {
        output = await db.collection(colName).update(condition, data)
    } catch(err){
        output = {'Error':`Error while updating in ${colName}`}
    }
    return output
}

// delet data 
async function deleteData(colName,condition){
    let output;
    try{
        output = await db.collection(colName).remove(condition)
    } catch(err){
        output = {'Error':`Error While removing data from ${colName}`}
    }
    return output
}





    module.exports = {
        dbConnect,
        getData,  
        getDataSort,
        getDataSortSkip,
        postData,
        updateData, 
        deleteData
    }