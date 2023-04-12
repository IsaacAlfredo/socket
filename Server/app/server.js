const net = require("net");
const { Worker } = require("worker_threads");

const HOST = "0.0.0.0";
const PORT = 8080;

const server = net.createServer((socket) => {
  console.log(
    `Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`
  );

  socket.on("data", (data) => {
    const request = JSON.parse(data.toString());

    const worker = new Worker("./worker.js", {
      workerData: request,
    });

    worker.on("message", (response) => {
      socket.write(JSON.stringify(response));
    });
  });

  socket.on("close", () => {
    console.log(
      `Cliente desconectado: ${socket.remoteAddress}:${socket.remotePort}`
    );
  });
});
server.listen(PORT, HOST, () => {
  console.log(`Servidor ouvindo em ${HOST}:${PORT}`);
});
