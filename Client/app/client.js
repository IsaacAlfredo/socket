const net = require("net");

// Configurações do cliente
const HOST = "127.0.0.1";
const PORT = 8080;

// Cria o socket do cliente
const socket = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log(`Conectado ao servidor: ${HOST}:${PORT}`);

  const newUser = {
    name: "Isaac",
    email: "isaac@example.com",
    password: "123456",
  };

  const updUser = {
    name: "Emilly",
    oldEmail: "isaac@example.com",
    newEmail: "emilly@example.com",
    password: "123456",
  };

  //Cria um usuário
  socket.write(
    JSON.stringify({
      action: "create",
      user: newUser,
    })
  );

  //Busca um usuário
  /*socket.write(
    JSON.stringify({
      action: "get",
      user: newUser,
    })
  );*/

  //Atualiza um usuário
  /*
  socket.write(
    JSON.stringify({
      action: "update",
      user: updUser,
    })
  );*/

  /*
  //deleta um usuário
  socket.write(
    JSON.stringify({
      action: "delete",
      email: "emilly@example.com",
    })
  );
  */
  //procura o usuario deletado
  /*socket.write(
    JSON.stringify({
      action: "get",
      user: updUser,
    })
  );*/

  /*socket.write(
    JSON.stringify({
      action: "gete",
      user: updUser,
    })
  );*/
});

// Evento de recebimento de dados
socket.on("data", (data) => {
  console.log(`Resposta do servidor: ${data}`);
  socket.end();
});

// Evento de fechamento de conexão
socket.on("close", () => {
  console.log("Conexão fechada");
});
