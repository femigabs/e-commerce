import express from 'express';
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
    res.send('Welcome to e_commerce');
});


router(app);

app.use((req, res) => {
    Response.notFoundError(res, 'Route not found!');
});

app.use((err, req, res) => {
    Response.notFoundError(res, err.message || err);
});

export default app;
