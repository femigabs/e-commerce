import { CategoryServices } from "../../services";
import { Response } from '../../utils';
import { client } from '../../config'
class CategoryController {

    static async createCategory(req, res) {
        try {
            const newCategory = await CategoryServices.createCategory(req.body);
            const data = {
                id: newCategory.id,
                product_type: newCategory.product_type,
                description: newCategory.description,
                created_at: newCategory.created_at
            }
            return newCategory
                ? Response.created(res, data, "Category created successfully.")
                : Response.badrequestError(res, "Error creating Category.")
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getAllCategory(req, res) {
        try {
            const allCategory = await CategoryServices.getAllCategory();
            if (allCategory) {
                client.setex('allCategory', 300, JSON.stringify(allCategory));  /*  expires in five minute*/
                client.get('allCategory', async (error, data) => {
                    if (data) {
                        return Response.ok(res, JSON.parse(data), "All Category fetched successfully.");
                    }
                    return Response.badrequestError(res, "Error fetching Category.");
                })
            }
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryServices.updateCategory(id, req.body);
            return category
                ? Response.ok(res, {}, 'Category updated successfully')
                : Response.badrequestError(res, 'Error updating Category')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryServices.deleteCategory(id);

            return category
                ? Response.ok(res, {}, 'Category deleted successfully')
                : Response.badrequestError(res, 'Error deleting Category')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }
}

export default CategoryController;