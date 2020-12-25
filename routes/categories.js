const express = require('express');
const router = express.Router();
const Categories = require('../models/categories');
const expressAsyncHandler = require('express-async-handler');
// const slugify = require('slugify');


//function to fetch the categories in parent children order (categories->subcategories)

function categoriesList(category,ParentId = null){

    const List = [];
    let Category;
    if(ParentId==null){
        Category = category.filter(cat => cat.ParentId ==undefined);
    }
    else{
        Category = category.filter(cat=>cat.ParentId ==ParentId);
    }

    for(let C of Category){
        List.push({
            _id: C._id,
            name:C.name,
            children:categoriesList(category,C._id)
        });
    }
    return List

}


router.post('/create/category',expressAsyncHandler(async(req, res) => {
    const categoryObj = new Categories({
        name:req.body.name,
        // slug:slugify(req.body.name)
    })
    if(req.body.ParentId){
        categoryObj.ParentId = req.body.ParentId
    }
    const cat = await categoryObj.save();
    res.send(cat)
   
}));

router.get('/categories/getcategory',(req,res)=>{
    Categories.find({}).exec((error,category)=>{
        if(error)return res.status(404).json({error});
        if(category){
            const List = categoriesList(category);
            res.status(200).json({List})
        }
    })
})


module.exports=router;