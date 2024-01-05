#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';

import Logger from '../src/logger.js';
import { getConfig } from '../src/commands/config-mgr.js';
import { start } from '../src/commands/start.js';

const logger = Logger('bin');

const validateArgs = async () => {
  try {
    const args = arg({
      '--start': Boolean,
      '--build': Boolean,
    });

    logger.debug('Validating arguments', args);
    return args;
  } catch (error) {
    logger.warn(error.message);
    console.log();
    usage();
    process.exit(1);
  }
};

try {
  const args = await validateArgs();

  if (args['--start']) {
    const config = await getConfig(process.cwd());
    start(config);
  }
} catch (error) {
  logger.warn(error.message);
  console.log();
  process.exit(1);
}

function usage() {
  console.log(`${chalk.whiteBright('cli [CMD]')}
  ${chalk.greenBright('--start')}\tstart the app
  ${chalk.greenBright('--build')}\tbuild the app
  `);
}
