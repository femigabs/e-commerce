import { Validate, Response } from "../../utils";
import { CategoryServices } from "../../services";

class CategoryMiddleware {

    static async createMiddleWare(req, res, next) {
        try {
            await Validate.schema.category.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(
                    /[\"]/gi,
                    ''
                ),
            });
        }
    };

    static async category(req, res, next) {
        try {
            const { product_type } = req.body;

            const data = await CategoryServices.checkIfCategoryExist(product_type);
            if (data) {
                return Response.conflictError(
                    res,
                    "Category already exist"
                )
            }
        } catch (e) {
            return Response.serverError(
                res,
                "Internal server error"
            )
        }
        next();
    }

    static async checkCategoryId(req, res, next) {
        const { id } = req.params;
        const categoryId = await CategoryServices.checkIfIdExist(id);
        if (categoryId) {
            return next();
        }
        return Response.notFoundError(res, 'Category Id not found');
    }

}

export default CategoryMiddleware;