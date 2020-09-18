export default {
    createOrder: `
        INSERT INTO orders(
            id,
            user_id,
            cart_id,
            product_id,
            quantity,
            price,
            sub_total
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,
}