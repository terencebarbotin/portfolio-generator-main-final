const responseHandler = require("./responseHandler");

function errorHandler (err, req, res, next) {
    console.error("[ERROR] ", err.message);

    const status = err.status || 500;

    const errorDetails = {
        code: status,
        details: err.message || "Internal Server Error"
    };

    responseHandler.createResponse(res, status, err.message, null, errorDetails);
};

module.exports = errorHandler;
