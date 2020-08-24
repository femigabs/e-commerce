import 'dotenv/config';
import { app, logger } from './config';

const port = process.env.PORT || 3002;

app.listen(port, () => {
    logger.info(`Application listen on port ${port}`);
});
