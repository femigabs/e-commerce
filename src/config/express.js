import express from 'express';
import status from 'http-status'
import client from './redis'
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import router from '../routes';
import { Response } from "../utils";


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.get('/', (req, res) => {
    client.ping((err, msg) => {
        if (err) {
            return Response.serverError(
                res,
                "Internal Server Error."
            )
        }
        res.status(200).send(res.body)
    });
});

router(app);

app.use((req, res) => {
    Response.notFoundError(res, 'Route not found!');
});

export default app;
