import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
import { cosmiconfigSync } from 'cosmiconfig';
import { createRequire } from 'node:module';
import Logger from '../logger.js';

const logger = Logger('config:mgr');
const configLoader = cosmiconfigSync('cli');

export async function getConfig(directory) {

  const result = configLoader.search(directory);

  if (!result) {
    logger.warn('No configuration found, using default values');
    return { port: 1234 };
  }

  const schema = getSchema();
  const ajv = new Ajv({ useDefaults: true });
  const validate = ajv.compile(schema);
  const valid = validate(result.config);

  if (!valid) {
    logger.warn('Invalid configuration was supplied');
    console.log();
    console.log(betterAjvErrors(schema, result.config, ajv));
    process.exit(1);
  }

  logger.debug('Received configuration', result.config);
  return result.config;
};

function getSchema() {
  const require = createRequire(import.meta.url);
  return require('../config/schema.json');
}