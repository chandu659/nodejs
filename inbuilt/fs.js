var fs = require('fs')
// create file \
// fs.writeFile('myCode.txt','Node Js code',function()
// {
//     console.log('file created')

// })

// append file
fs.appendFile('myCode.txt','Nodejs, python,fullstack\n',function(){
    console.log('file appended')
})

//read File
// fs.readFile('myCode.txt','utf-8',function(err)
// {
//     if(err) throw err
    
// })

// fs.readFile('db.json','utf-8',function(err,data){
//     if(err) throw err;
//     console.log(data)
// })

//read filesync

// let data = fs.readFileSync('myCode.txt','mycontext.txt',function(err,data)
// {
//     if(err) throw err;
//     console.log(data)
// })

// let data1 = fs.readFileSync('myCode.txt',{encoding: 'utf-8',flag:'r'});
// console.log(data1)

// let data = fs.readFileSync('db.json',{encoding:'utf-8',flag:'r'});
// console.log(data)

//rename the file
// fs.rename('myCode.txt','Newcode.txt',function(err)
// {
//     if(err) throw err
//     console.log('file renamed')
// })

// fs.unlink('Newcode.txt',function(err)
// {
//     if(err) throw err
//     console.log('file deleted')
// })
