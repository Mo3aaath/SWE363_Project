const mongoose=require("mongoose")

const QueSchema=new mongoose.Schema({
    question:String,
    answers:[],
    rightAns:String,

})

const question=mongoose.model("question",QueSchema)
module.exports=question