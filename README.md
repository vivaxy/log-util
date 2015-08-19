# log-util

node log utility

## usage

`npm i --save log-util`

```
var Log = require('log-util'),
    log = new Log(0);           // or log = new Log('verbose');
    
log.verbose('verbose', 0);
log.debug('debug', 1);
log.info('info', 2);
log.warn('warn', 3);
log.error('error', 4);
```

## log level

```
Log.VERBOSE === 0;
Log.DEBUG === 1;
Log.INFO === 2;
Log.WARN === 3;
Log.ERROR === 4;
```

