export default {
    createCart: `
        INSERT INTO cart(
            id,
            user_id,
            product_id,
            price,
            sub_total
        ) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
    getCartByUserId: `
        SELECT * FROM cart WHERE user_id=($1)
    `,
    getCartByProductId: `
       SELECT * FROM cart WHERE product_id=($1) 
    `,
    deleteCart: `
        DELETE FROM cart WHERE id=($1) RETURNING *
    `,
    getCartById: `
        SELECT * FROM cart WHERE id=($1)
    `,
    updateCart: `
        UPDATE cart SET quantity=($1), sub_total=($2), updated_at= now() WHERE id=($3) RETURNING *
    `,
}