export default {
    createTransaction: `
        INSERT INTO transaction(
            id,
            user_id,
            cart_id,
            payment_id,
            reference,
            amount,
            status,
            currency
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `,
    verifyTransaction: `
        update transaction set verified=($1), updated_at= now() where reference=($2)
    `,
    getTransactionByReference: `
       SELECT * FROM transaction WHERE reference= ($1)
    `
}