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
  usuarios.push(user);
  // Converter o objeto JavaScript de volta para uma string JSON
  const usuariosAtualizadosJSON = JSON.stringify(usuarios, null, 2);

  // Escrever a string JSON atualizada no arquivo
  fs.writeFileSync("usuarios.json", usuariosAtualizadosJSON, "utf-8");
  console.log("Novo usuário adicionado com sucesso!");
  parentPort.postMessage({ status: "OK" });
} else if (request.action === "get") {
  const user = usuarios.find((u) => u.email === request.user.email);
  if (!user) {
    parentPort.postMessage({ status: "user not found" });
  } else {
    parentPort.postMessage({ status: "OK", response: user });
  }
} else if (request.action === "update") {
  const user = usuarios.find((u) => u.email === request.user.oldEmail);
  const index = usuarios.findIndex((u) => u.email === request.user.oldEmail);
  if (!user) {
    parentPort.postMessage("User not found");
  } else {
    const updUser = {
      name: request.user.name,
      email: request.user.newEmail,
      password: request.user.password,
    };

    usuarios[index] = updUser;

    const usuariosAtualizadosJSON = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", usuariosAtualizadosJSON, "utf-8");
    console.log("Usuário atualizado com sucesso!");

    parentPort.postMessage({ status: "OK", response: updUser });
  }
} else if (request.action === "delete") {
  const user = usuarios.find((u) => u.email === request.email);
  const index = usuarios.findIndex((u) => u.email === request.email);
  if (!user) {
    parentPort.postMessage("User not found");
  } else {
    usuarios.splice(index, 1);
    parentPort.postMessage("OK");

    const usuariosAtualizadosJSON = JSON.stringify(usuarios, null, 2);
    fs.writeFileSync("usuarios.json", usuariosAtualizadosJSON, "utf-8");
    console.log("Usuário atualizado com sucesso!");
  }
} else {
  parentPort.postMessage("Bad Request");
}
