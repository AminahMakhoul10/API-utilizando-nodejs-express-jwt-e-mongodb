//criada a rota de autenticação que e uma rota onde verifica se o email ou senha existem.
//geração de token para o usuario que se autenticou(so consegue abrir uma "porta se ele tiver aquela chave)")
//gerou o token, validou. rotas do sistema q precisa estar autenticado para acessar elas.
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
    console.log('middleware');
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: true,
            message: "Token não foi fornecido"

        })
    }

    //validacao de token 

    const parts = authHeader.split(" ");

    if(parts.length !== 2){
        return res.status(401).json({
            error: true,
            message: "Tipo de token inválido"
        })
    }

    const [scheme, token] = parts;

    if(scheme.indexOf("Bearer") !== 0){
        return res.status(401).json({
            error: true,
            message: "Token mal formatado"
        })
    }

    return jwt.verify(token,authConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).json({
                error: true,
                message: "Token inválido/expirado"
            })
        }

        req.userLogged = decoded;

        console.log(err);
        console.log(decoded);

        return next();

    } )
}