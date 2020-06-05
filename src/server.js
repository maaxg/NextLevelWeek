//Variavel express que recebe uma função que recebe um pedido para receber uma responsa do express
//ES6 Module, é o novo jeito que o ecma script tem para importar o express
//import express from "express";
//Também pode ser feito assim
const express = require("express")
//Um objeto do servidor
const server = express()

//pegar o banco de dados da pasta database
const db = require("./database/db.js")

// configuração das pastas públicas
//O use é uma configuração especifica do servidor.
        //arquivos estáticos são configurados usando o express.static
server.use(express.static("public"))

//Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true}))

//Utilizando template engine
const nunjucks = require("nunjucks")
//Configuração do nunjucks
                    //a pasta dos htmls
                        //O segundo argumento é um object
nunjucks.configure("src/views", {
    //servidor
    express: server,
    //se vai ou não usar o cache para atualização  e etc.
    noCache: true
} 


)

//configurar caminhos para a aplicação
//página inicial
//get é um verbo http(do protocolo) uma regra do http é trabalhar com VERBOS.
//o get via a "/", faz uma requisição através da função
//req é a requisição/pedido
//res é a response/resposta
//Um servidor funciona com perguntas e respostas.
server.get("/", (req, res) => {
    //A resposta do servidor será o send ou sendFile
    //res.sendFile(__dirname + "/views/index.html")
    //Utilizando o nunjuck com a template engine
    //você pode omitir o dirname porque a sua pasta raiz já foi declarada!
    //este metodo render pode passar variaveis para dentro do html
                            //Esse objeto deve refletir a variavel passada no index.
    return res.render("index.html", {title: "Seu marketplace de coletas de resíduos"})
})





server.get("/create-point", (req, res) => {
    //req.query são as Query Strings da url.
    //Para passar os parâmetros da url
    //console.log(req.query)
  
    return res.render("create-point.html")
})
server.post("/savepoint", (req, res) =>{
    //req.body é o corpo do formulario em .json
    //console.log(req.body)
    //Inserção de dados
    const query = `INSERT INTO places (
        name,
        image, 
        address,
        address2,
        state,
        city,
        items) VALUES(?, ?, ?, ?, ?, ?, ?)`

        const values = [
            req.body.name,
            req.body.image,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInsertData(err){
            const saved = false;
            if(err){
                console.log(err)
                return res.render("create-point.html", {saved: saved})
            }
            console.log("Cadastrado com sucesso")
            console.log(this)

            return res.render("create-point.html", {saved: true})
        }
    db.run(query, values, afterInsertData)

   
})



server.get("/search", (req, res) => {
  
    const search = req.query.search
    if(search == "") {
        //pesquisa vazia
        return res.render("search.html", {total: 0})

    }
      //pegar os dados do banco de dados
                    //Seleciona tudo de um lugar onde o nome da cidade seja parecido com o da pesquisa que foi passado na url
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        } 
     /*   console.log("Aqui estão seus registros: ")
        console.log(rows)*/
        //ele vai renderizar o search e colocar os valores de rows dentro do objeto places
        const total = rows.length
        return res.render("search.html", { places: rows, total})
    })

 
  
})

//Ligar o servidor
server.listen(3030)
