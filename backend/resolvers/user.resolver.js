import { users } from "../dummyData/Data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, name, password, gender } = input;
                if (!username || !name || !password || !gender) {
                    throw new Error("All Field are Required");
                }
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User Already Exists");
                }
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
                const newUser = new User({
                    username,
                    name,
                    password: hashPassword,
                    gender,
                    profilePicture: gender == "male" ? boyProfilePic : girlProfilePic,
                });
                await newUser.save();
                await context.login(newUser);
                return newUser;
            } catch (err) {
                console.log("Error in SignUp: ", err);
                throw new Error(err.message || "internal Server Error");
            }
        },
        logIn: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                const { user } = await context.authenticate("graphql-local", {
                    username,
                    password,
                });
                await context.login(user);
                return user;
            } catch (err) {
                console.log("Error in LogIn: ", err);
                throw new Error(err.message || "internal Server Error");
            }
        },
        logOut: async (_, __, context) => {
            try {

                await context.logout();
                req.session.destroy((err) => {
                    if (err) throw err
                })
                req.clearCookie("connect.sid")
                return {
                    message: "Logout SuccessFully"
                }
            } catch (err) {
                console.log("Error in Logout: ", err)
                throw new Error(err.message || "internal Server Error")

            }

        }
    },
    Query: {
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser()
                return user

            } catch (err) {
                console.log("Error in AuthUser: ", err)
                throw new Error(err.message || "internal Server Error")

            }
        },
        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId)
                return user
            } catch (error) {
                console.log("Error in user query: ", err)
                throw new Error(err.message || "Error geeting user")

            }
        },
    },
    //TODO = > ADD USER/TRANSACTION RELATION

};

export default userResolver;
