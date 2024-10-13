const os = require('os');
const fs = require('fs');
const path = require('path');

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (let interfaceName in interfaces) {
    for (let networkInterface of interfaces[interfaceName]) {
      if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
        return networkInterface.address;
      }
    }
  }
}

const ipAddress = getLocalIPAddress();
fs.writeFileSync(path.resolve(__dirname, '../.env.local'), `REACT_APP_LOCAL_IP=${ipAddress}\n`);

