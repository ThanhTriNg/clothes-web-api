const Joi = require('joi');
const orderQueries = Joi.string().valid('ASC', 'DESC');

const { error } = Joi.object({
    orderQueries,
}).validate({ orderQueries: 'ASC1' });

// console.log(error);
console.log(error.details[0].message);
