'use strict';
import fs from 'fs';
import { EDITranslator } from './translate.js';

let translator = new EDITranslator();

let inputFile = null;

// Look for -input in our process.argv[], what comes after the equal sign is our file name/path
// For example, node index -input=my810sample.edi would open my810sample.edi in the same directory as this application
process.argv.forEach((v,i) => {
    if(v.substring(0,6) == '-input') {
        inputFile = v.substring(7);  
    }
});


if(inputFile) {
    fs.readFile(inputFile, 'utf8', (err, fd) => {
        if(err) throw err;
        translator.resolve(fd);
        console.log('EDI', translator.transactionCode, 'version', translator.transactionVersion);
    });
}