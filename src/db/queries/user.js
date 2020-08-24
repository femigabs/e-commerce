export default {
    createUser: `
    INSERT INTO users(
        id,
        first_name,
        last_name,
        email,
        phone_number,
        password,
        salt,
        verification_code_expiry,
        verification_code
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `,
    createAuthUser: `
    INSERT INTO users(
        id,
        first_name,
        last_name,
        email,
        password,
        salt,
        is_active
    ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,
    getUserByEmail: `
    SELECT * FROM users WHERE email=($1)
    `,
    updateVerificationStatus: `
    UPDATE users SET is_active=($1), updated_at= now() WHERE id=($2) RETURNING *
    `,
    updateVerificationCode: `
    UPDATE users SET verification_code=($1), verification_code_expiry=($2), updated_at= now() WHERE id=($3) RETURNING *
    `,
    resetPassword: `
    UPDATE users SET verification_code=($1), password=($2), salt=($3), updated_at= now() WHERE id=($4) RETURNING *
    `,
    findUserById: `
    SELECT * FROM users WHERE id=($1)
    `,
    findUserByCode: `
    SELECT * FROM users WHERE verification_code=($1)
    `,
    checkIfUserIsVerified: `
    SELECT * FROM users WHERE is_active=($1)
    `
}