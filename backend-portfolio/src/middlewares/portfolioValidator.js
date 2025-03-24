const { body, check, validationResult } = require("express-validator");
const responseHandler = require("./responseHandler");

const portfolioValidator = [
    body("name")
        .notEmpty().withMessage("name is mandatory"),
    body("email")
        .notEmpty().withMessage("email is mandatory")
        .isEmail().withMessage("Invalid email format"),
    body("jobRole")
        .notEmpty().withMessage("jobRole is mandatory"),
    body("bio")
        .notEmpty().withMessage("bio is mandatory"),
    body("github")
        .optional().isURL().withMessage("Invalid GitHub URL format"),
    body("linkedin")
        .optional().isURL().withMessage("Invalid LinkeIn URL format"),
    body("experiences").optional().isArray().withMessage("experiences must be an array"),

    // experiences validation
    check("experiences.*.title")
        .notEmpty().withMessage("title is mandatory"),
    check("experiences.*.description")
        .notEmpty().withMessage("description is mandatory"),
    check("experiences.*.isProject")
        .isBoolean().withMessage("isProject must be a boolean"),
    check("experiences.*.skills").optional().isArray().withMessage("skills must be an array"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorDetails = errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }));

            return responseHandler.createResponse(
                res,
                400,
                "Invalid or Missing fields",
                null,
                responseHandler.errorDetails(400, errorDetails)
            );
        }
        next();
    }
];

module.exports = portfolioValidator;
