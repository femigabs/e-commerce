import 'dotenv/config';
import status from 'http-status';
import { app, logger, client } from './config';

const port = process.env.PORT || 3002;

app.listen(port, () => {
    logger.info(`Application listen on port ${port}`);
});

app.get('/', (req, res) => {
    client.ping((err, msg) => {
        if (err) {
            return res.send(status.INTERNAL_SERVER_ERROR);
        }
        res.send(msg, status.OK);
    });
});