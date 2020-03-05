import portfinder from 'portfinder';

async function getAvailablePort() {
  return await portfinder.getPortPromise();
}

export {
  getAvailablePort
};
