import { Router } from 'express';
import passport from "passport";
import { fbAuth, googleAuth } from '../controllers';
import { UserMiddleware } from '../middleware'

const userRouter = new Router();

userRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

userRouter.get('/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

userRouter.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/fail'
    }), (req, res) => {
        res.redirect('/dashboard')
    });

userRouter.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/fail'
    }), (req, res) => {
        res.redirect('/dashboard ')
    });

userRouter.get("/fail", (req, res) => {
    res.send("Failed attempt");
});

userRouter.get("/dashboard", async (req, res) => {
    await UserMiddleware.userAuth(req, res)
});


export default userRouter;