const { workerData, parentPort } = require("worker_threads");
const fs = require("fs");

// Extrai os dados da mensagem e da lista de usuários
const request = workerData;

const usersJSON = fs.readFileSync("users.json", "utf-8");
const users = JSON.parse(usersJSON);

//create
if (request.action === "create") {
  const user = request.user;
  users.push(user);
  const usersUpdateJSON = JSON.stringify(users, null, 2);

  fs.writeFileSync("users.json", usersUpdateJSON, "utf-8");
  console.log("Novo usuário adicionado com sucesso!");
  parentPort.postMessage({ status: 200, message: "OK" });
  //get
} else if (request.action === "get") {
  const user = users.find((u) => u.email === request.user.email);
  if (!user) {
    parentPort.postMessage({ status: 404, message: "User not Found" });
  } else {
    parentPort.postMessage({ status: 200, message: "OK", response: user });
  }
  //update
} else if (request.action === "update") {
  const user = users.find((u) => u.email === request.user.oldEmail);
  const index = users.findIndex((u) => u.email === request.user.oldEmail);
  if (!user) {
    parentPort.postMessage({ status: 404, message: "User not Found" });
  } else {
    const updUser = {
      name: request.user.name,
      email: request.user.newEmail,
      password: request.user.password,
    };

    users[index] = updUser;

    const usersUpdateJSON = JSON.stringify(users, null, 2);
    fs.writeFileSync("users.json", usersUpdateJSON, "utf-8");
    console.log("Usuário atualizado com sucesso!");

    parentPort.postMessage({ status: 200, message: "OK", response: updUser });
  }
  //delete
} else if (request.action === "delete") {
  const user = users.find((u) => u.email === request.email);
  const index = users.findIndex((u) => u.email === request.email);
  if (!user) {
    parentPort.postMessage({ status: 404, message: "User not Found" });
  } else {
    users.splice(index, 1);
    parentPort.postMessage({ status: 200, message: "OK" });

    const usersUpdateJSON = JSON.stringify(users, null, 2);
    fs.writeFileSync("users.json", usersUpdateJSON, "utf-8");
    console.log("Usuário deletado com sucesso!");
  }
} else {
  //Bad Request
  parentPort.postMessage({ status: 400, message: "Bad Request" });
}
