import { asyncHandler } from "./asyncHandler.js";
import { validationResult } from "express-validator";
import { CustomError } from "./CustomError.js";

const handleValidationErrors = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new CustomError(400, "validation errors", errors.array()));
    }
    next();
});

export { handleValidationErrors };
