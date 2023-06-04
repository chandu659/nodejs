let express = require('express');
const productRouter = require('./productRouter');
let categoryRouter = express.Router();
let category= [
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    },
    {
        "id":4,
        "category": "Footwear",
        "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
    }
]


//default router of category
categoryRouter.route('/')
    .get(function(req,res){
        res.send(category)
    })


//detail route of category
categoryRouter.route('/details')
    .get(function(req,res){
        res.send('This is Catgeory Details route')
    })

module.exports = categoryRouter