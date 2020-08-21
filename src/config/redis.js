import redis from 'redis';
import logger from './logger';

//const REDIS_URL = process.env.REDIS_URL || 6379;

const client = redis.createClient({url: process.env.REDIS_URL});

client.on('error', (error) => {
    logger.error(error);
});

export default client;