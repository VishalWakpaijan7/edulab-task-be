// Internal Server Error Handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // error in console for ref
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
// 404 Error Handler
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
    });
};
module.exports = { errorHandler, notFoundHandler };