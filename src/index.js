const express = require('express');
const { v4: uuidv4 } = require("uuid") //v4 => numeros aleatorios

const app = express();
app.use(express.json());

const customers = [];


/**
 * cpf - string
 * name - string
 * id - uuid 
 * statement - []
//  */
// app.post("/account", (request, response) => {
//   const { cpf, name } = request.body;
//   const customerAlreadyExists = customers.some( //comparacao dos valores
//     (customer) => customer.cpf === cpf
//   );

//   if(customerAlreadyExists) {
//     return response.status(400).json({error: "Customer already existis! "}); //400 utilizado para erros
//   }
  

//   customers.push({
//     cpf,
//     name,
//     id: uuidv4(),
//     statement: []
//   });

//   return response.status(201).send(); //201 utilizado para quando um dado é criado
  
// });

app.listen(3333);



/**
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação específica
 * DELETE - Deletar uma informação específica
 */

/**
 * Tipo de parãmetros
 * 
 * Route Params => Identificar um recurso editar/deletar/buscar
 * Query Params => Paginação / Filtros 
 * Body Params  => Os objetos inserção/ alteração (JSON)
 * 
 */

// app.get("/courses",(request, response) => {
//   const query = request.query;
//   console.log(query);
//   return response.json(["Curso 1", "Curso 2", "Curso 3"]);
// })

// app.post("/courses",(request, response) => {
//   const body = request.body;
//   console.log(body);
//   return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
// })

// app.put("/courses/:id",(request, response) => {
//   const { id } = request.params;
//   console.log(id);
//   return response.json(["Curso 2", "Curso 3", "Curso 4","Curso 5"]);
// })

// app.patch("/courses/:id",(request, response) => {
//   return response.json(["Curso 5", "Curso 6", "Curso 3", "Curso 4"]);
// })

// app.delete("/courses/:id",(request, response) => {
//   return response.json(["Curso 5", "Curso 6", "Curso 4"]);
// })

//localhost:3333
