const DJPApi = require('djp-api');

const port = process.env.PORT || 3000;
const address = process.env.LISTEN_ADDRESS || '0.0.0.0';
const specificationFilePath = `${__dirname}/app/swagger.json`;
const service = require('./app/controllers');

const Server = new DJPApi({
  port,
  address,
  specificationFilePath,
  service,
  fastifyConfig: {
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      prettyPrint: { translateTime: 'SYS:yy-mm-dd HH:MM:ss o' },
    },
  },
});
Server.start();
