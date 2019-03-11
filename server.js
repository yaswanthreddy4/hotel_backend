require('./app/models/db.connection')
const express = require('express');
const hotel_route = require('./app/routes/hotel_routes');
const user_route = require('./app/routes/user_routes');
const config = require('./app/config/config');
const body_parser = require('body-parser');
const log4js = require('log4js');
const fs = require('fs');
// var passport = require('passport');
// var session = require('express-session');

let app = express();

app.use(function(req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

// app.use(body_parser.urlencoded({
//     extended: false
// }));
app.use(body_parser.json({
    type: 'application/json'
}));
// app.use(body_parser.raw('type:data-binary'));


log4js.configure('./app/config/log4js.json');
var startupLogger = log4js.getLogger('startup');
var accessLogger = log4js.getLogger('access');

try {
    fs.mkdirSync('./logs');
} catch (error) {
    if (error.code != 'EEXIST') {
        console.error("Could Not setup Log Directory", error);
        process.exit(1);
    }
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', hotel_route);
app.use('/api', user_route);

// app.use(session({
//     secret: 's3cr3t',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(config.port, config.host, function(req, res, next) {
    console.log(`server is running on port : ${config.port}`);
    // startupLogger.info("Server is Runnning on http://127.0.0.1:" + config.port);
});