exports.errorDetails = (code, details) => {
    return {
        code: code,
        details: details
    }
};

exports.createResponse = (res, status, message, data=null, error=null) => {
    const response = {
        status: status >=400 ? "error" : "success",
        message,
    };

    if (data) response.data = data;
    if (error) response.error = error;

    return res.status(status).json(response);
};
