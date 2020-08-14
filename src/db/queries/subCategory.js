export default {
    createSubCategory: `
        INSERT INTO sub_category(
            id,
            category_id,
            product_sub_category,
            description
        ) VALUES ($1, $2, $3, $4) RETURNING *
    `,
    getAllSubCategory: `
        SELECT * FROM sub_category
    `,
    getSubCategoryByProductSubCategory: `
        SELECT * FROM sub_category WHERE product_sub_category=($1)
    `,
    getSubCategoryByCategoryId: `
        SELECT * FROM sub_category WHERE category_id=($1)
    `,
    getSubCategoryById: `
        SELECT * FROM sub_category WHERE id=($1)
    `,
    deleteSubCategory: `
        DELETE FROM sub_category WHERE id=($1) RETURNING *
    `,
    updateSubCategory: `
        UPDATE sub_category SET product_sub_category=($1), description=($2), updated_at= now() WHERE id=($3) RETURNING *
    `,
}