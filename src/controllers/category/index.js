import { CategoryServices } from "../../services";
import { Response, Hash } from '../../utils';

class CategoryController {

    static async createCategory(req, res) {
        try {
            const newCategory = await CategoryServices.createCategory(req.body);
            return newCategory
                ? Response.created(
                    res,
                    newCategory,
                    "Category created successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error creating Category."
                )
        } catch (e) {
            console.log('nnn', e)
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async getAllCategory(req, res) {
        try {
            const allCategory = await CategoryServices.getAllCategory();

            return allCategory
                ? Response.ok(
                    res,
                    allCategory,
                    "All Category fetched successfully."
                )
                : Response.badrequestError(
                    res,
                    "Error fetching Category."
                )
        } catch (e) {
            console.log('aa', e)
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryServices.updateCategory(id, req.body);

            return category
                ? Response.ok(
                    res,
                    category,
                    'Category updated successfully'
                )
                : Response.badrequestError(
                    res,
                    'Error updating Category'
                )
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryServices.deleteCategory(id);

            return category
                ? Response.ok(
                    res,
                    category,
                    'Category deleted successfully'
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
}

export default CategoryController;