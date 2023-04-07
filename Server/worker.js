const { workerData, parentPort } = require("worker_threads");
const fs = require("fs");

// Extrai os dados da mensagem e da lista de usuários
const { request, users } = workerData;

const usuariosJSON = fs.readFileSync("usuarios.json", "utf-8");
const usuarios = JSON.parse(usuariosJSON);

// Processa a mensagem
if (request.action === "create") {
  const user = request.user;

  // Adicionar um novo objeto ao objeto JavaScript
  const novoUsuario = { nome: "Maria", idade: 30 };
  usuarios.push(novoUsuario);
  // Converter o objeto JavaScript de volta para uma string JSON
  const usuariosAtualizadosJSON = JSON.stringify(usuarios, null, 2);

  // Escrever a string JSON atualizada no arquivo
  fs.writeFileSync("usuarios.json", usuariosAtualizadosJSON, "utf-8");
  console.log("Novo usuário adicionado com sucesso!");
  parentPort.postMessage({ status: "OK", users: users });
} else if (request.action === "get") {
  const user = users.find((u) => u.email === request.user.email);
  console.log(users);
  console.log(request.user.email);
  if (!user) {
    parentPort.postMessage({ status: "user not found" });
  } else {
    console.log("deu certo!");
    parentPort.postMessage({ status: "OK", response: user });
  }
}
/*
  if (user) {
    const response = `Name: ${user.name}, Email: ${user.email}`;
    parentPort.postMessage(response);
  } else {
    parentPort.postMessage("User not found");
  }
} else if (request.startsWith("UPDATE_USER")) {
  const user = users.find((u) => u.email === email);
  if (user) {
    user.name = name;
    parentPort.postMessage("OK");
  } else {
    parentPort.postMessage("User not found");
  }
} else if (request.startsWith("DELETE_USER")) {
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    parentPort.postMessage("OK");
  } else {
    parentPort.postMessage("User not found");
  }
} else {
  parentPort.postMessage("Invalid command");
}*/
