export default {
    createCart: `
        INSERT INTO cart(
            id,
            user_id
        ) VALUES ($1, $2) RETURNING *
    `,
    createCartProduct: `
        INSERT INTO cart_product(
            id,
            cart_id,
            product_id, 
            price, 
            sub_total
        ) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
    getCartByUserId: `
        SELECT * FROM cart WHERE user_id=($1)
    `,
    getCartProductByCartId: `
        SELECT * FROM cart_product WHERE cart_id=($1)
    `,
    getCartProductByProductId: `
       SELECT * FROM cart_product WHERE product_id=($1) 
    `,
    deleteCart: `
        DELETE FROM cart WHERE id=($1) RETURNING *
    `,
    deleteCartProduct: `
        DELETE FROM cart_product WHERE id=($1) RETURNING *
    `,
    getCartProductById: `
        SELECT * FROM cart_product WHERE id=($1)
    `,
    updateCartProduct: `
        UPDATE cart_product SET quantity=($1), sub_total=($2), updated_at= now() WHERE id=($3) RETURNING *
    `,
    sumSubTotal: `
        SELECT SUM(sub_total) FROM cart_product WHERE cart_id=($1)
    `
}