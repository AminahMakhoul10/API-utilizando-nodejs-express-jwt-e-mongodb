const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const UserModel = require("../models/User");

const router = express.Router();

const generateToken = (user = {}) =>{
    return jwt.sign({
        id: user.id,
        name: user.name
    }, authConfig.secret , {
        expiresIn: 86400   //dps de quantos segundos esse token vai expirar
    });

}

router.post("/register", async(req, res) =>{

    const {email} = req.body;

    if(await UserModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message: "Usuario já existe"
        })
    }
    const user = await UserModel.create(req.body)

    user.password = undefined;  //para nao aparecer a senha na hora de cadastrar no postman

    return res.json({
        user,
        token: generateToken(user)
    });
    
    /*return res.json({
        error: false,
        message: "Registrado com sucesso",
        data: User
    });*/
})

router.post("/authenticate", async(req,res) => {

    const {email, password} = req.body;

    const user = await UserModel.findOne({email}).select("+password");//para comparar asenha
    console.log(user);

    //autrnticacao para ver se esse usuario existe.
    if(!user){
        return res.status(400).json({
            error: false,
            message: "Usuário não encontrado"
        })
    }

    if(!await bcryptjs.compare(password, user.password)){
        return res.status(400).send({
            error: true,
            message: "Senha inválida"
        })
    }
    user.password = undefined;

    /*const token =jwt.sign({
        id: user.id,
        name: user.name
    }, authConfig.secret , {
        expiresIn: 86400 /dps de quantos segundos esse token vai expirar

    });*/

    return res.json({
        user,
        token: generateToken(user)
    });
})
module.exports = router;
