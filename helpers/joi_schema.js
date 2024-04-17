import Joi from 'joi';

// export const email = Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
//     .required();

export const email = Joi.string().pattern(new RegExp('gmail.com$')).required();
export const password = Joi.string().min(8).required();

export const order = Joi.string().valid('ASC', 'DESC');
