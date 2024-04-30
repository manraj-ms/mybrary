const fs = require('fs');

const errorLogStream = fs.createWriteStream('error.log', { flags: 'a' });

const errorHandler = (err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!!!";
    const log = `[${new Date().toISOString()}] ${errStatus} - ${errMessage} - ${req.originalUrl} - ${req.method}`;
    errorLogStream.write(log + '\n');

    return res.status(errStatus).json({
        success: false,
        message: errMessage,
        data: []
    });

    // console.error(`[${new Date().toISOString()}] ${errStatus} \n ${errMessage} \n ${req.originalUrl} \n ${req.method}`);

};

module.exports = errorHandler;