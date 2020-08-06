import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
import strategy from 'passport-google-oauth20';
import { UserServices } from "../../services";
import { db, userQuery } from "../../db"

const GoogleStrategy = strategy.Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        (async (accesToken, refreshToken, profile, done) => {
            console.log(profile)
            try {
                const { email, given_name, family_name } = profile._json
                const user = await UserServices.checkIfUserExist(email);
                if (user) {
                    return done(null, user)
                }
                const id = uuidv4();
                const salt = process.env.SALT;
                const password = process.env.PASSWORD;
                const is_active = true;
                const payload = [id, given_name, family_name, email, password, salt, is_active];
                const newUser = await db.any(userQuery.createAuthUser, payload);
                return done(null, newUser[0])
            } catch (e) {
                console.log(e)
                return done(error);
            }
        })
    )
)