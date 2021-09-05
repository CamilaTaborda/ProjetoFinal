const mongoose = require('./db');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

UserSchema.pre ('save', async function(next){
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash;
    next();
});


const Cadastro = mongoose.model ('Cadastro', UserSchema);

module.exports  = Cadastro;