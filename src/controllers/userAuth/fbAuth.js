import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
import strategy from 'passport-facebook';
import { UserServices } from "../../services";
import { db, userQuery } from "../../db"

const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'first_name', 'last_name', 'email']
        },
        (async (accesToken, refreshToken, profile, done) => {
            console.log(profile)
            try {
                const { email, first_name, last_name } = profile._json;
                const user = await UserServices.checkIfUserExist(email);
                if (user) {
                    return done(null, user)
                }
                const id = uuidv4();
                const salt = process.env.SALT;
                const password = process.env.PASSWORD;
                const is_active = true;
                const payload = [id, first_name, last_name, email, password, salt, is_active];
                const newUser = await db.any(userQuery.createAuthUser, payload);
                return done(null, newUser[0])
            } catch (e) {
                console.log('aaa', e)
                return done(error);
            }
        })

    ))


