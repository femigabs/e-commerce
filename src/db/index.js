import db from './setup/postgres';
import userQuery from './queries/user';
import categoryQuery from './queries/category';
import subCategoryQuery from './queries/subCategory';
import productQuery from './queries/product';
import orderQuery from './queries/order';
import cartQuery from './queries/cart';
import transactionQuery from './queries/transaction'

export {
    db,
    userQuery,
    categoryQuery,
    subCategoryQuery,
    productQuery,
    orderQuery,
    cartQuery,
    transactionQuery
};