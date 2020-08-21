export default {
    createOrderDetails: `
        INSERT INTO order_details(
            id,
            user_id,
            first_name,
            last_name,
            address,
            state,
            city,
            phone_number
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `,
    deleteOrderDetails: `
        DELETE FROM order_details WHERE id=($1) RETURNING *
    `,
    getOrderDetailsById: `
        SELECT * FROM order_details WHERE id=($1)
    `,
    getOrderDetailsByUserId: `
        SELECT * FROM order_details WHERE user_id=($1)
    `,
    updateOrderDetails: `
        UPDATE order_details SET first_name=($1), last_name=($2), address=($3), state=($4), city=($5), phone_number=($6), updated_at= now() WHERE id=($7) RETURNING *
    `,
}