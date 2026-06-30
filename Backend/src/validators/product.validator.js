import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }

    next();
}

export const createProductValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
    body("priceCurrency").notEmpty().withMessage("Price currency is required"),
    validateRequest
]
/**
 * {
    "message": "Validation error",
    "errors": [
        {
            "type": "field",
            "msg": "Title is required",
            "path": "title",
            "location": "body"
        },
        {
            "type": "field",
            "msg": "description is required",
            "path": "description",
            "location": "body"
        },
        {
            "type": "field",
            "msg": "Price amount must be a number",
            "path": "priceAmount",
            "location": "body"
        },
        {
            "type": "field",
            "msg": "price currency is required",
            "path": "priceCurrency",
            "location": "body"
        }
    ]
}
 */