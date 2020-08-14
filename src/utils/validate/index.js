import Joi from "@hapi/joi"

const schema = {
    user: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(
                new RegExp(
                    '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{6,})'
                )
            )
            .required(),
        first_name: Joi.string().max(100).required(),
        last_name: Joi.string().max(100).required(),
        phone_number: Joi.string()
            .pattern(
                new RegExp(
                    /^\d{11}$/
                )
            )
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(
            new RegExp(
                '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{6,})'
            )
        ),
    }),

    idparam: Joi.number().required(),

    email: Joi.object({
        email: Joi.string().email().required()
    }),

    category: Joi.object({
        product_type: Joi.string().max(100).required(),
        description: Joi.string().required()
    }),

    subCategory: Joi.object({
        product_sub_category: Joi.string().max(100).required(),
        description: Joi.string().required()
    }),

    product: Joi.object({
        product_name: Joi.string().max(100).required(), 
        description: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
    }),

    productStatus: Joi.object({
        status: Joi.string().valid('in_stock', 'out_of_stock')
    }),

    productName: Joi.object({
        product_name: Joi.string().required()
    })
};

export default {
    schema
};