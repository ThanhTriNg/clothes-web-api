import Joi from 'joi';

//custom joi
const joiJson = Joi.extend({
    type: 'array',
    base: Joi.array(),
    messages: {
        'array.base': '{{#label}} must be a valid JSON array',
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
});

//auth
export const authSchema = {
    email: Joi.string().pattern(new RegExp('gmail.com$')).required(),
    password: Joi.string().min(8).required(),
};
//order
export const order = Joi.string().valid('ASC', 'DESC');

//product
export const productSchema = {
    // -- required
    name: Joi.string().required(),
    price: Joi.number().required().messages(),
    // -- allow null
    description: Joi.string().allow(null).optional(),
    descriptionSort: Joi.string().allow(null).optional(),
    subCategoryId: Joi.string().allow(null).optional(),
    sizes: joiJson.array(),
    colors: joiJson.array(),
};
