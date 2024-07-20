const fs = require('fs');

const loggerFunction = (err, req, res, next) => {
    let errorLogStr = `${req.method} ${req.hostname}$ ${req.url} | ${new Date(Date.now()).toString()} | ${err}\n`;
    fs.appendFile("./public/log.txt", errorLogStr, (err) => { if (err) next(err); });
};
const errorHandler = (err, req, res, next) => {
    loggerFunction(err, req, res, next);
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
// 404 Error Handler
const notFoundHandler = (req, res, next) => {
    loggerFunction('404 Not Found', req, res, next);
    res.status(404).json({
        success: false,
        message: '404 Not Found',
    });
};
module.exports = { errorHandler, notFoundHandler };