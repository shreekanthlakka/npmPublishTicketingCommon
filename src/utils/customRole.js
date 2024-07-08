import { CustomError } from "./CustomError.js";

const customRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json(
                new CustomError(403, "not authorized to use this service")
            );
        }
    };
};

export { customRole };
