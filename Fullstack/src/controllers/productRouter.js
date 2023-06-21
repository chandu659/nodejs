let express = require('express');
let productRouter = express.Router();
const {getData} = require('./dbcontroller')

// default Router of product  
productRouter.route('/')
    .get(async(req,res)=>{
        //res.send(products)\
        let query = {};
        let products =await getData('products',query)
        res.render('products',{title:'products page',products})
    })
productRouter.route('/catgeory/:id')
.get(async function(req,res)
{
    let id = req.param.id
    let query = {'category_id':Number(id)};
    let products = await getData('products',query)
    res.render('products',{title:'products page',products})

})


//detail router of product
productRouter.route('/details')
    .get(function(req,res){
        res.send('This is products details')
    })

module.exports = productRouter