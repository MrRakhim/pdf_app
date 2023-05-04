const Joi = require('joi');

module.exports.documentSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net', 'ru' ] } })
});

module.exports.updateDocumentSchema = Joi.object({ 
    title: Joi.string().min(3).max(30).required()
});
