const mongoose= require('mongoose');
const MovieSchema=new mongoose.Schema({
    title:{type:String, require:true, unique:true},
    desc:{type:String},
    img:{type:String},
    imgTitle:{type:String},
    imgSmall:{type:String},
    trailer:{type:String},
    video:{type:String},
    year:{type:String},
    ageLimit:{type:Number},
    genre:{type:String},
    isSeries:{type:Boolean, default:false},
},
{
    timestamps:true
})

module.exports= mongoose.model("movie",MovieSchema)