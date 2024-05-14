const mongoose = require("../database/index");
const bcryptjs = require("bcryptjs")

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,

    }, 
    email:{
        type: String,
        required: true,
        unique: true,  //email unico
        lowercase: true,    //coverter as letras em minusculo pq email é tudo minusculo
    },
    password: {
        type: String,
        required: true,
        select: false,   //sempre que fizer uma consulta no mongodb eu nao quiero q ele mostre a senha

    },
    createdAt:{   //armazenar quando o registro foi criado
        type: Date,
        default: Date.now   //padrao valor padrao dela vai ser a data d agr
    }

});
//criptografia com bcryptjs
UserSchema.pre("save", async function(next){
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

})

const User = mongoose.model("User", UserSchema);

module.exports = User;