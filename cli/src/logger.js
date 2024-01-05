import chalk from 'chalk';
import debug from 'debug';

export default function createLogger(name) {
  return {
    log: (...args) => console.log(chalk.gray(...args)),
    warn: (...args) => console.warn(chalk.yellow(...args)),
    error: (...args) => console.error(chalk.red(...args)),
    highlight: (...args) => console.log(chalk.bgCyanBright(chalk.whiteBright(...args))),
    debug: debug(name),
  };
}