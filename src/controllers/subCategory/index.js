import { SubCategoryServices } from "../../services";
import { Response } from '../../utils';
import { client } from '../../config'

class SubCategoryController {

    static async createSubCategory(req, res) {
        const { category_id } = req.params;
        try {
            const newSubCategory = await SubCategoryServices.createSubCategory(category_id, req.body);
            return newSubCategory
                ? Response.created(res, newSubCategory, "Sub Category created successfully.")
                : Response.badrequestError(res, "Error creating Sub Category.")
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getAllSubCategory(req, res) {
        try {
            const allSubCategory = await SubCategoryServices.getAllSubCategory();
            if (allSubCategory) {
                client.setex('allSubCategory', 300, JSON.stringify(allSubCategory));  /*  expires in five minute*/
                client.get('allSubCategory', async (error, data) => {
                    if (data) {
                        return Response.ok(res, JSON.parse(data), "All Sub Category fetched successfully.");
                    }
                    return Response.badrequestError(res, "Error fetching Sub Category.");
                })
            }
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getSubCategoryByCategoryId(req, res) {
        const { category_id } = req.params;
        try {
            const subCategory = await SubCategoryServices.checkIfCategoryIdExist(category_id);
            if (subCategory) {
                client.setex(category_id, 300, JSON.stringify(subCategory));  /*  expires in five minute*/
                client.get(category_id, async (error, data) => {
                    if (data) {
                        return Response.ok(res, JSON.parse(data), "Sub Category fetched successfully.");
                    }
                    return Response.badrequestError(res, "Error fetching Sub Category.");
                })
            }
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async getProductSubCategoryByCategoryId(req, res) {
        const { category_id } = req.params;
        try {
            const subCategory = await SubCategoryServices.checkIfCategoryIdExist(category_id);
            const productSubCategory = subCategory.map((item) => {
                return item.product_sub_category
            })            
            if (productSubCategory) {
                client.setex(category_id, 300, JSON.stringify(productSubCategory));  /*  expires in five minute*/
                client.get(category_id, async (error, data) => {
                    if (data) {
                        return Response.ok(res, JSON.parse(data), "Product Sub Category fetched successfully.");
                    }
                    return Response.badrequestError(res, "Error fetching Product Sub Category.");
                })
            }
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async deleteSubCategory(req, res) {
        try {
            const { id } = req.params;
            const subCategory = await SubCategoryServices.deleteSubCategory(id);

            return subCategory
                ? Response.ok(res, subCategory, 'Sub Category deleted successfully')
                : Response.badrequestError(res, 'Error deleting Category')
        } catch (error) {
            return Response.serverError(res, "Internal Server Error.")
        }
    }

    static async updateSubCategory(req, res) {
        try {
            const { id } = req.params;
            const subCategory = await SubCategoryServices.updateSubCategory(id, req.body);

            return subCategory
                ? Response.ok(res, {}, 'Sub Category updated successfully')
                : Response.badrequestError(res, 'Error updating Sub Category')
        } catch (e) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
    }


}

export default SubCategoryController;