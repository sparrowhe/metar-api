const express = require('express')
const path = require('path')

const app = express()

const config = require("../config");
const router = require('./router');
const logger = require('./logger');

const router_api = require('./routes/api');
const router_metar = require('./routes/metar');

const cors = require('cors');
const history = require('connect-history-api-fallback');
var proxy = require('express-http-proxy')
var compression = require('compression')

function printWelcomeInfo() {
    console.log("__  __ ______ ________      _____             _____ ______ ");
    console.log("|  \\/  |  ____|__   __|/\\   |  __ \\      /\\   |  __ \\_   _|");
    console.log("| \\  / | |__     | |  /  \\  | |__) |    /  \\  | |__)| | |  ");
    console.log("| |\\/| |  __|    | | / /\\ \\ |  _  /    / /\\ \\ | ___/  | |  ");
    console.log("| |  | | |____   | |/ ____ \\| | \\ \\   / ____ \\| |    _| |_ ");
    console.log("|_|  |_|______|  |_/_/    \\_\\_|  \\_\\ /_/    \\_\\_|   |_____|");
}

async function run() {
    printWelcomeInfo();
    app.use(compression());
    app.use(cors());
    app.use(history());
    app.use('/metar', router_metar);
    app.use('/api', router_api);
    app.use('/api/image', proxy('http://caac.xafande.com:8000/image/', {}))
    app.use('/',express.static(path.join(__dirname, '../frontend'),{
        etag: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
    }));
    app.listen(config.api.port, config.api.host, () => {
        logger.log(`Metar API is listening on ${config.api.host}:${config.api.port}.`);
    });
}

run();