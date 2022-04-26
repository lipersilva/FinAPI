const express = require('express');
const { v4: uuidv4 } = require("uuid") //v4 => numeros aleatorios

const app = express();
app.use(express.json());

const customers = [];

//middleware
function verifyIfExistsAccountCPF(request, response, next){
  const { cpf } = request.headers;
  const customer = customers.find(customer => customer.cpf === cpf);

  // - [x] Não deve ser possível buscar extrato em uma conta não existente
  if(!customer) {
    return response.status(400).json({ error: "Customer not found"});
  }

  request.customer = customer;

  return next();

}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount;
    }else{
      return acc - operation.amount;
    }
  },0)

  return balance;
}

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

// app.use(verifyIfExistsAccountCPF); //tudo que estiver abaixo, ira utilizar
//extrato
app.get("/statement", verifyIfExistsAccountCPF,(request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

//deposito
app.post("/deposit", verifyIfExistsAccountCPF,(request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
})

//saque
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if(balance < amount ) {
    return response.status(400).json({ error: "Insufficient funds!"})
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();

})

app.get("/statement/date", verifyIfExistsAccountCPF,(request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00")

  const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date (dateFormat.toDateString()))

  return response.json(customer.statement);
});

app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;
  return response.status(201).send();
})

app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer)
})

app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1)

  return response.status(200).json(customer); 
})

app.get("/balance", verifyIfExistsAccountCPF , (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);
  return response.json(balance);
})

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
