const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ProductName:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    },
    // image: { 
        // type: String, 
        // required: true 
    // },
    price:{
        type: Number,
        required: true,
    },
    // rating: { 
    //     type: Number, 
    //     required: true
    //  },
    // numReviews: { type: Number, required: true },
    Category:{type:mongoose.Schema.Types.ObjectId,ref:'Categories',required:true}
},{ timestamps:true },)

module.exports = mongoose.model('Product',ProductSchema);