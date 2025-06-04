class ServerError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = "ServerError";
        this.statusCode = statusCode;
    }
}

class NotFoundError extends ServerError {
    constructor(message = "Not Found") {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 404;
    }
}

class BadRequestError extends ServerError {
    constructor(message = "Bad Request") {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}

class UnauthorizedError extends ServerError {
    constructor(message = "No authentication") {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 401;
    }
}

module.exports = { ServerError, NotFoundError, BadRequestError, UnauthorizedError };
