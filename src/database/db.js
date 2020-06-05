//importar a dependência so sqlite3
                //uma função quando reside dentro de um objeto, ela é chamada de método
const sqlite3 = require("sqlite3").verbose() //o verbose retorna mensagens sobre o que está acontecendo com o site
//Iniciar o objeto que irá fazer operações do banco de dados
        //instanciação de um novo objeto, dentro de um construtor 
const db = new sqlite3.Database("./src/database/database.db") //Ele entende que precisa criar um banco de dados dentro do caminho

module.exports = db
//Utilizar o objeto de banco de dados, para as operações
/*db.serialize(() => {
    //Criar uma tabela com comandos SQL
   db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //Inserção de dados na tabela
    const query = `
    INSERT INTO places (
        name,
        image,
        address,
        address2,
        state,
        city,
        items) VALUES(?, ?, ?, ?, ?, ?, ? );
        `
    const values = [
        "",
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"

]
    //Estilo da função callback é uma função passada como parâmetro e ela é chamada durante um certo tempo.
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com Sucesso!")
        console.log(this) //O this faz referencia a resposta do run;
    }
    //INSERÇÃO
  // db.run(query, values, afterInsertData)
       //Consulta de todos os dados da tabela
       db.all(`SELECT * FROM places`, function(err, rows) {
        if(err){
            return console.log(err)
        } 
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    //Deletar dados da tabela
   db.run(`DELETE FROM places WHERE id = ?`, [7], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })
    
})*/