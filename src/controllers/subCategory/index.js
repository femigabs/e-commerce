import { SubCategoryServices } from "../../services";
import { Response } from '../../utils';

class SubCategoryController {

    static async createSubCategory(req, res) {
        const { category_id } = req.params;
        try {
            const newSubCategory = await SubCategoryServices.createSubCategory(category_id, req.body);
            return newSubCategory
                ? Response.created(
                    res,
                    newSubCategory,
                    "Sub Category created successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error creating Sub Category."
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async getAllSubCategory(req, res) {
        try {
            const allSubCategory = await SubCategoryServices.getAllSubCategory();

            return allSubCategory
                ? Response.ok(
                    res,
                    allSubCategory,
                    "All Sub Category fetched successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error fetching Sub Category."
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async getSubCategoryByCategoryId(req, res) {
        const { category_id } = req.params;
        try {
            const subCategory = await SubCategoryServices.checkIfCategoryIdExist(category_id);

            return subCategory
                ? Response.ok(
                    res,
                    subCategory,
                    "Sub Category fetched successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error fetching Sub Category."
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async deleteSubCategory(req, res) {
        try {
            const { id } = req.params;
            const subCategory = await SubCategoryServices.deleteSubCategory(id);

            return subCategory
                ? Response.ok(
                    res,
                    subCategory,
                    'Sub Category deleted successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error deleting Category'
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async updateSubCategory(req, res) {
        try {
            const { id } = req.params;
            const subCategory = await SubCategoryServices.updateSubCategory(id, req.body);

            return subCategory
                ? Response.ok(
                    res,
                    subCategory,
                    'Sub Category updated successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error updating Sub Category'
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }


}

export default SubCategoryController;