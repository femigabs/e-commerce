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
        SELECT 
            cart_product.id,
            cart_product.cart_id,
            product.product_name,
            product.product_image,
            product.status,
            cart_product.product_id,
            cart_product.quantity,
            cart_product.price,
            cart_product.sub_total
        FROM product
        JOIN cart_product
        ON product.id = cart_product.product_id
        WHERE cart_id=($1)
    `,
    getCartProduct: `
        SELECT * FROM cart_product WHERE cart_id=($1)
    `,
    getProductByCartId: `
       SELECT * FROM cart_product WHERE cart_id=($1) AND product_id =($2)
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