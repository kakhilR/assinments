const express = require('express');
const Products = require('../models/products');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();


router.post('/create/product',expressAsyncHandler(async(req,res)=>{
    const ProductsObject = new Products({
        ProductName: req.body.ProductName,
        description: req.body.description,
        price: req.body.price,
        Category: req.body.Category,
    }) 
    const products = await ProductsObject.save();
    res.send(products);
}));

router.get('/products/list',(req,res)=>{
    Products.find({}).exec((error,products)=>{
        if(error)return res.status(400).json({error})
        if(products){
            res.status(200).json({products})
        }
    })
})




module.exports=router;
