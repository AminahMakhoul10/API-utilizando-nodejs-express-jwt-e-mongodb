const mongoose = require('mongoose');

const url = 'mongodb+srv://aminahmakhoul:20304050@cluster2.lp7f6ls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2';

// Conecta usando promises
mongoose.connect(url)
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(error => console.error('Erro ao conectar:', error));

// Não precisa mais definir a Promise global
// mongoose.Promise = global.Promise;

module.exports = mongoose;





/* versao antiga

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aminahmakhoul:20304050@cluster2.lp7f6ls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2", {}, (error)=>{
    if(error){
        console.log("Falha ao autenticar com o mongodb");
        console.log(error);
        return;
    }

    console.log("Conexão com o mongodb estável");
})

mongoose.Promise = global.Promise;

module.exports = mongoose;*/