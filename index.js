/**
 * @since 15-08-19 16:13
 * @author vivaxy
 */
'use strict';
var chalk = require('chalk'),
    dateFormat = require('dateformat'),

    /**
     * level object array
     * @type {*[]}
     */
    levelArray = [
        {
            level: 0,
            string: 'verbose',
            color: 'gray'
        },
        {
            level: 1,
            string: 'debug',
            color: 'green'
        },
        {
            level: 2,
            string: 'info',
            color: 'cyan'
        },
        {
            level: 3,
            string: 'warn',
            color: 'yellow'
        },
        {
            level: 4,
            string: 'error',
            color: 'red'
        }
    ],

    /**
     * Log
     * @param level
     * @param dateFormat
     * @constructor
     */
    Log = function Log(level, dateFormat) {
        this.setLevel(level);
        this.setDateFormat(dateFormat);
    },
    p = {};

Log.prototype = p;
p.constructor = Log;

/**
 * main log method
 * @param level
 * @returns {p}
 */
p.log = function (level) {
    var time = chalk.gray('[' + dateFormat(new Date(), this.dateFormat) + ']'),
        args = Array.prototype.slice.call(arguments, 1),
        color = this.find('level', level).color;
    args = args.map(function (string) {
        return chalk[color](string);
    });
    args.unshift(time);
    if (level >= this.level) {
        console.log.apply(console, args);
    }
    return this;
};

/**
 * find level object which `key` = `value`
 * @param key
 * @param value
 * @returns {*}
 */
p.find = function (key, value) {
    return levelArray.filter(function (o) {
            return o[key] === value;
        })[0] || {};
};

/**
 * set level
 * @param level
 * @returns {p}
 */
p.setLevel = function (level) {
    if (typeof level === 'string') level = this.find('string', level.toLowerCase()).level;
    this.level = level || 0;
    return this;
};

/**
 * set date format
 * @param dateFormat
 * @returns {p}
 */
p.setDateFormat = function (dateFormat) {
    this.dateFormat = dateFormat || 'HH:MM:ss.l';
    return this;
};

levelArray.forEach(function (o) {

    /**
     * export level string value
     * @type {number|*|Array}
     */
    Log[o.string.toUpperCase()] = o.level;

    /**
     * set methods to prototype
     * @returns {number|*}
     */
    p[o.string] = function () {
        var args = arguments;
        Array.prototype.unshift.call(args, o.level);
        return this.log.apply(this, args);
    };
});

var log = new Log();
log.Log = Log;
log.levelArray = levelArray;
module.exports = log;
