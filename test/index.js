/**
 * @since 15-08-19 16:37
 * @author vivaxy
 */
'use strict';
var Log = require('../index.js'),

    log = new Log(0);

log.verbose('verbose', Log.VERBOSE);
log.debug('debug', Log.DEBUG);
log.info('info', Log.INFO);
log.warn('warn', Log.WARN);
log.error('error', Log.ERROR);
