/**
 * @since 15-08-19 16:13
 * @author vivaxy
 */

import chalk from 'chalk';
import * as util from 'util';
import * as figures from 'figures';
import * as logSymbols from 'log-symbols';

export let level: number = 0;

function getIcon(symbol: string): string {
  if (symbol === 'debug') {
    return chalk.grey(figures.pointerSmall);
  }
  return (logSymbols as any)[symbol];
}

function createLogger(_level: number, symbol: string) {
  return function(...messages: any[]): void {
    if (_level >= level) {
      const formatted = messages.map(function(message) {
        if (typeof message === 'object') {
          return util.inspect(message, {
            depth: null,
          });
        }
        return message;
      });
      console.log(getIcon(symbol), ...formatted);
    }
  };
}

export enum levels {
  debug = 0,
  info = 1,
  success = 2,
  warn = 3,
  error = 4,
}

export function setLevel(_level: levels): void {
  level = _level;
}

export const debug = createLogger(levels.debug, 'debug');
export const info = createLogger(levels.info, 'info');
export const success = createLogger(levels.success, 'success');
export const warn = createLogger(levels.warn, 'warning');
export const error = createLogger(levels.error, 'error');
