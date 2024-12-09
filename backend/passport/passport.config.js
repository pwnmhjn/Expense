import passport from "passport";
import bcrypt from "bcryptjs"
import { GraphQLLocalStrategy } from "graphql-passport";

import User from "../models/user.model.js"

export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log("Serializing User");
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        console.log("Deserielizing User");
        try {
            const user = await User.findById(id);
            done(null, user)
        } catch (err) {
            done(err)
        }
    })
    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username })
                if (!user) {
                    throw new Error("Invalid Username/Password")
                }
                const validPassword = bcrypt.compare(password, user.password)
                if (!validPassword) {
                    throw new Error("Invalid Username/Password")
                }
                return done(null, user)
            } catch (err) {
                return done(err)
            }
        })
    )
}