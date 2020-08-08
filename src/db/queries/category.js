export default {
    createCategory: `
    INSERT INTO category(
        id,
        product_type,
        description
    ) VALUES ($1, $2, $3) RETURNING *
    `,
    getCategoryByProductType: `
        SELECT * FROM category WHERE product_type=($1)
    `,
    getCategoryById: `
        SELECT * FROM category WHERE id=($1)
    `,
    getAllCategory: `
        SELECT * FROM category
    `,
    deleteCategory: `
        DELETE FROM category WHERE id=($1) RETURNING *
    `,
    updateCategory: `
        UPDATE category SET product_type=($1), description=($2), updated_at= now() WHERE id=($3) RETURNING *
    `,
}