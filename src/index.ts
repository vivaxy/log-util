/**
 * @since 15-08-19 16:13
 * @author vivaxy
 */

import * as util from 'util';
import * as logSymbols from 'log-symbols';

let currentLevel: number = 0;

function createLogger(level: number, symbol: string) {
  return function(...messages: any[]): void {
    const formatted = messages.map(function(message) {
      if (typeof message === 'object') {
        return util.inspect(message, {
          depth: null,
        });
      }
      return message;
    });
    if (level >= currentLevel) {
      console.log((logSymbols as any)[symbol], ...formatted);
    }
  };
}

export enum levels {
  info = 0,
  success = 1,
  warn = 2,
  error = 3,
}

export function setLevel(level: levels): void {
  currentLevel = level;
}

export const info = createLogger(levels.info, 'info');
export const success = createLogger(levels.success, 'success');
export const warn = createLogger(levels.warn, 'warning');
export const error = createLogger(levels.error, 'error');
