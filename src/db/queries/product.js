export default {
    createProduct: `
        INSERT INTO product(
            id,
            sub_category_id,
            product_name,
            description,
            quantity,
            price,
            product_image
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,
    getProductByName: `
        SELECT * FROM product WHERE product_name LIKE ($1) ORDER BY created_at DESC OFFSET 0 LIMIT 10
    `,
    getProductById: `
        SELECT * FROM product WHERE id=($1)
    `,
    getAllProduct: `
        SELECT * FROM product
    `,
    getProductBySubCategoryId: `
        SELECT * FROM product WHERE sub_category_id=($1)
    `,
    deleteProduct: `
        DELETE FROM product WHERE id=($1) RETURNING *
    `,
    updateProduct: `
        UPDATE product SET product_name=($1), description=($2), quantity=($3), price=($4), product_image=($5), updated_at= now() WHERE id=($6) RETURNING *
    `,

}