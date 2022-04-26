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
*/
// - [x] Deve ser possível criar uma conta
// - [x] Não deve ser possível cadastrar uma conta com CPF já existente
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const customerAlreadyExists = customers.some( //comparacao dos valores (retornar true/false)
    (customer) => customer.cpf === cpf
  );

  if(customerAlreadyExists) {
    return response.status(400).json({error: "Customer already existis! "}); //400 utilizado para erros
  }
  

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send(); //201 utilizado para quando um dado é criado
  
});

// - [x] Deve ser possível buscar o extrato bancário do cliente

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;
  
  // - [x] Não deve ser possível buscar extrato em uma conta não existente
  const customer = customers.find(customer => customer.cpf === cpf);

  if(!customer) {
    return response.status(400).json({error: "Customer not found"});
  }

  return response.json(customer.statement);
});

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
