const mongoose = require('mongoose');

const categoriesSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    // slug:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    ParentId:{
        type:String
    }
},
{ timestamps:true }
)

module.exports = mongoose.model('Categories', categoriesSchema)