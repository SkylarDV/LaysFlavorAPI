const config = require('config');

function getMongoUri() {
  // Allow explicit override via environment variable
  if (process.env.MONGO_URI && process.env.MONGO_URI.length > 0) {
    return process.env.MONGO_URI;
  }

  // config package will load default.json or production.json based on NODE_ENV
  const uriFromConfig = config.has('db.uri') ? config.get('db.uri') : null;
  if (uriFromConfig && uriFromConfig.startsWith('${')) {
    // production.json placeholder - fall back to env var or throw
    if (process.env.MONGO_URI) return process.env.MONGO_URI;
    throw new Error('MONGO_URI environment variable must be set in production');
  }

  return uriFromConfig;
}

module.exports = {
  getMongoUri,
  port: (process.env.PORT && Number(process.env.PORT)) || (config.has('server.port') ? config.get('server.port') : 3000)
};
