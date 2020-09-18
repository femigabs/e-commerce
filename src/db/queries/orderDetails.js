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
            phone_number, 
            is_default
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `,
    deleteOrderDetails: `
        DELETE FROM order_details WHERE id=($1) RETURNING *
    `,
    getOrderDetailsById: `
        SELECT * FROM order_details WHERE id=($1)
    `,
    getOrderDetailsByUserId: `
        SELECT * FROM order_details WHERE user_id=($1) ORDER BY is_default DESC
    `,
    updateOrderDetails: `
        UPDATE order_details SET first_name=($1), last_name=($2), address=($3), state=($4), city=($5), phone_number=($6), updated_at= now() WHERE id=($7) RETURNING *
    `,
    setDefaultAddress: `
        UPDATE order_details SET is_default= true, updated_at= now() WHERE id=($1) RETURNING *
    `,
    resetAddress: `
        UPDATE order_details SET is_default= false, updated_at= now() WHERE user_id=($1) RETURNING *
    `,
}