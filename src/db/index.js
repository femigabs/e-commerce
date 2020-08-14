import db from './setup/postgres';
import userQuery from './queries/user';
import categoryQuery from './queries/category';
import subCategoryQuery from './queries/subCategory'
import productQuery from './queries/product'

export {
    db,
    userQuery,
    categoryQuery,
    subCategoryQuery,
    productQuery
};