const NodeCache = require( "node-cache" );

const myCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

module.exports = myCache