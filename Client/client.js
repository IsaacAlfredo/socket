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

  // Adiciona um usuário
  socket.write(
    JSON.stringify({
      action: "create",
      user: newUser,
    })
  );
  /*socket.write(
    JSON.stringify({
      action: "get",
      user: newUser,
    })
  );*/
  //Busca um usuário
  /*
  //atualiza um usuário
  const updUser = {
    name: "Emilly",
    email: "emilly@example.com",
    password: "123456",
  };

  socket.write(
    JSON.stringify({
      action: "update",
      user: updUser,
    })
  );
  //deleta um usuário
  socket.write(
    JSON.stringify({
      action: "delete",
      user: updUser,
    })
  );
  //procura o usuario deletado
  socket.write(
    JSON.stringify({
      action: "get",
      user: updUser,
    })
  );*/
});

// Evento de recebimento de dados
socket.on("data", (data) => {
  const message = JSON.parse(data.toString());
  console.log(`Resposta do servidor: ${message.status}`);
  socket.end();
});

// Evento de fechamento de conexão
socket.on("close", () => {
  console.log("Conexão fechada");
});
