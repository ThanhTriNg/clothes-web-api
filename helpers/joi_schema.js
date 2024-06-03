import Joi from 'joi';

//custom joi
const joiJson = Joi.extend({
    type: 'array',
    base: Joi.array(),
    messages: {
        'array.base': '{{#label}} must be a valid JSON array',
        'array.sizes': '{{#label}} must be a valid XS|S|M|L|XL',
    },
    coerce: {
        from: 'string',
        method(value, helpers) {
            if (typeof value !== 'string' || (value[0] !== '[' && !/^\s*\[/.test(value))) {
                return;
            }

            try {
                return { value: JSON.parse(value) };
            } catch (ignoreErr) {}
        },
    },
    rules: {
        sizes: {
            validate(value, helpers, args, options) {
                const regex = /^((XS|S|M|L|XL),?)+$/;
                const stringValue = value.toString();
                if (!regex.test(stringValue)) {
                    return helpers.error('array.sizes');
                }
                return value;
            },
        },
    },
});

//auth
export const authSchema = {
    email: Joi.string().pattern(new RegExp('gmail.com$')).required(),
    password: Joi.string().min(8).required(),
};

//user
export const userRoleSchema = {
    roleCode: Joi.string().valid('TA', 'TU'),
};
export const userSchema = {
    lName: Joi.string(),
    fName: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    password: Joi.string(),
    email: Joi.string(),
};
//category
export const categorySchema = {
    name: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'both').required(),
};
export const updateCategorySchema = {
    name: Joi.string(),
    gender: Joi.string().valid('male', 'female', 'both'),
};

//sub category
export const subCategorySchema = {
    name: Joi.string().required(),
    categoryId: Joi.number().required(),
};

//order
export const order = Joi.string().valid('ASC', 'DESC');

//product
export const productSchema = {
    // -- required
    name: Joi.string().required(),
    // -- allow null
    stock: Joi.number().min(0),
    price: Joi.number(),
    description: Joi.string(),
    descriptionSort: Joi.string(),
    subCategoryId: Joi.number(),
    imageUrl: Joi.any(),
    subImageUrls: Joi.any(),
    colors: joiJson.array(),
    sizes: joiJson.array().sizes(),
    gender: Joi.string().valid('male', 'female', 'both'),
};

//product -- update
export const updateProductSchema = {
    // -- allow null
    ...productSchema,
    name: Joi.string(),
};
