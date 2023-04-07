const net = require("net");
const { Worker } = require("worker_threads");

// Configurações do servidor
const HOST = "127.0.0.1";
const PORT = 8080;

// Lista de usuários
var users = [];

// Cria o servidor
const server = net.createServer((socket) => {
  console.log(
    `Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`
  );

  // Evento de recebimento de dados
  socket.on("data", (data) => {
    const request = JSON.parse(data.toString());
    console.log(`Mensagem recebida do cliente: ${request}`);

    // Cria um worker thread para processar a mensagem
    const worker = new Worker("./worker.js", {
      workerData: { request, users },
    });

    // Evento de recebimento de resposta do worker thread
    worker.on("message", (response) => {
      console.log("Recebido resposta do worker:", JSON.stringify(response));
      socket.write(JSON.stringify(response));
      users = response.users;
    });
  });

  // Evento de fechamento de conexão
  socket.on("close", () => {
    console.log(
      `Cliente desconectado: ${socket.remoteAddress}:${socket.remotePort}`
    );
  });
});

// Inicia o servidor
server.listen(PORT, HOST, () => {
  console.log(`Servidor ouvindo em ${HOST}:${PORT}`);
});
