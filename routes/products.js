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

router.put('/products/update/:id',async(req, res)=>{
    const product = await Products.findById(req.params.id);
    if(product){
        product.ProductName = req.body.ProductName;
        product.description = req.body.description;
        product.price = req.body.price;
        product.Category = req.body.Category;
        const updatedproducts = await product.save();
        res.status(200).send(updatedproducts)
    }
    else{
        res.status(500).json({message:"error"})
    }
     
})




module.exports=router;
