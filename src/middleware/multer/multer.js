import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage }).single('product_image');

export default upload;