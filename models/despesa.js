const mongoose = require('./db');

const UserSchema = new mongoose.Schema({
    despesa:{
        type:String,
        unique:true,
        required:true,
        
    },
    valor:{
        type:String,
        unique:true,
        required:true,
        
    },
    ccusto:{
        type:String,
        required:true,
        
    },
    orcamento:{
        type:String,
        required:true,
       
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
const Despesa = mongoose.model ('Despesa', UserSchema);

module.exports  = Despesa;