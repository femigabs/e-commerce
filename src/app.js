import 'dotenv/config';
import status from 'http-status';
import { app, logger, client } from './config';

const port = process.env.PORT || 3002;

app.listen(port, () => {
    logger.info(`Application listen on port ${port}`);
});
