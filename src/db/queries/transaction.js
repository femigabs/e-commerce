export default {
    createTransaction: `
        INSERT INTO transaction(
            id,
            order_id,
            reference,
            amount,
            status,
            currency
        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `,
    verifyTransaction: `
        update transaction set verified=($1) where reference = ($2)
    `,
}