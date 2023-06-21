let express = require('express');
const productRouter = require('./productRouter');
let categoryRouter = express.Router();
const {getData} = require('./dbcontroller')


//default router of category
categoryRouter.route('/')
    .get(async(req,res)=>{
        //res.send(category)
        let query={};
        let data = await getData('catgeory',query)
        res.render('catgeory',{title:'Catgeory page',data})
    })


//detail route of category
categoryRouter.route('/details')
    .get(function(req,res){
        res.send('This is Catgeory Details route')
       
        
    })

module.exports = categoryRouter