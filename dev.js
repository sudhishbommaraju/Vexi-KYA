const { spawn } = require('child_process');
const net = require('net');

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      resolve(false);
    });
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

async function start() {
  let port = 3000;
  while (!(await checkPort(port))) {
    console.log(`Port ${port} is in use. Detecting if another port is available and auto-incrementing...`);
    port++;
  }
  
  console.log(`Server running at http://localhost:${port}`);
  
  // Follows exact requirement 'use next dev -p 3000'
  spawn('npx', ['next', 'dev', '-p', port.toString()], { stdio: 'inherit', shell: true });
}

start();
