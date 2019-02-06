'use strict';


/**
 * 
 * EDITranslator class represents an EDI translation object
 * 
 */
class EDITranslator {
    constructor() {
        this.transactionCode = null;
        this.transactionControlNumber = null;
        this.transactionVersion = null;
        this.transactionCodeRegex = /[0-9]{3}/; 
        this.transactionCodePrefixRegex = /^(ST[*])/m; // This regex ensures we are only reading the ST at the first of the line
    }
    

    /**
     * 
     * The resolve method examines the contents of the string passed and extracts the EDI transaction code
     * and the EDI transaction version, e.g. code 810, version 6010.
     * 
     * @param {string} _f The file contents to examine and resolve basic information for
     * 
     */
    resolve(_f) {
        // TODO apparently the version can be overridden in ST03, for now - we pick it out of GS08...
        let versionLocation = _f.indexOf('*X*');
        if(versionLocation > -1) {
            this.transactionVersion = parseInt(_f.substring((versionLocation + 3), (versionLocation + 9)));
        }

        let prefixLocation = _f.indexOf('ST*');
        if(prefixLocation > -1) {
            this.transactionCode = _f.substring((prefixLocation + 3),(prefixLocation + 6));
            this.transactionControlNumber = _f.substring((prefixLocation + 7), (prefixLocation + 16));
        }

        
        return true;
    }
}

export { EDITranslator };