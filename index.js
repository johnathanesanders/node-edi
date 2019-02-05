'use strict';

/** Bootstrapper for microservices 
 * Utilizes babel for ES6 transpiling
 */
require('babel-register');
require('babel-polyfill');

let dotenv = require('dotenv');

/** Load environment variables up first */
dotenv.config();
require('./app.js');