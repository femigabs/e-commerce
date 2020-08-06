export const ok = (res, data, message) => res.status(200).json({
    status: 200,
    data,
    message,
});

export const created = (res, data, message) => res.status(201).json({
    status: 201,
    data,
    message,
});

export const accepted = (res, data, message) => res.status(202).json({
    status: 202,
    data,
    message,
});

export const noContent = (res, message) => res.status(204).json({
    status: 204,
    message,
});

export const badrequestError = (res, message) => res.status(400).json({
    status: 'error',
    error_code: 400,
    message,
});

export const unauthorizedError = (res, message) => res.status(401).json({
    status: 'error',
    error_code: 401,
    message,
});

export const forbiddenError = (res, message) => res.status(403).json({
    status: 'error',
    error_code: 403,
    message,
});

export const notFoundError = (res, message) => res.status(404).json({
    status: 'error',
    error_code: 404,
    message,
});

export const pageNotFoundError = (res, message) => res.status(404).json({
    status: 'error',
    error_code: 404,
    message
});

export const conflictError = (res, message) => res.status(409).json({
    status: 'error',
    error_code: 409,
    message,
});

export const goneError = (res, message) => res.status(410).json({
    status: 'error',
    error_code: 410,
    message,
});

export const fieldNotFoundError = (res, message) => res.status(422).json({
    status: 'error',
    error_code: 422,
    message
});

export const serverError = (res, message) => res.status(500).json({
    status: 'error',
    error_code: 500,
    message,
});

export const transactionError = (error_code, message) => ({
    status: 'error',
    error_code: 554,
    message,
});

