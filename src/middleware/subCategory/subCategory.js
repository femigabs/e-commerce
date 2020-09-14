import { Validate, Response } from "../../utils";
import { SubCategoryServices } from "../../services";

class SubCategoryMiddleware {

    static async createMiddleWare(req, res, next) {
        try {
            await Validate.schema.subCategory.validateAsync(req.body);
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

    static async subCategory(req, res, next) {
        try {
            const { product_sub_category } = req.body;

            const data = await SubCategoryServices.checkIfSubCategoryExist(product_sub_category);
            if (data) {
                return Response.conflictError(res, "Sub Category already exist")
            }
        } catch (error) {
            return Response.serverError(res, "Internal server error")
        }
        next();
    }

    static async checkSubCategoryId(req, res, next) {
        const { id } = req.params;
        const categorySubId = await SubCategoryServices.checkIfSubCategoryIdExist(id);
        if (categorySubId) {
            return next();
        }
        return Response.notFoundError(res, 'Sub Category Id not found');
    }
}

export default SubCategoryMiddleware;