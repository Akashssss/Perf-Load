const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').availableParallelism();
const process = require('process');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
    console.log(`worker ${process.pid} has been created`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}