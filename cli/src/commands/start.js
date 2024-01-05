import Logger from '../logger.js';

const logger = Logger('commands:start');

function start(config) {
  logger.highlight('Starting service on port', config.port);
}

export {
  start
}