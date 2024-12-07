import express from "express"
import http from "http"
import cors from "cors"
import passport from "passport";
import session from "express-session";
import { expressMiddleware } from "@apollo/server/express4";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildContext } from "graphql-passport";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import connectMongo from "connect-mongodb-session";
import { ApolloServer } from "@apollo/server";


import mergedResolver from "./resolvers/index.js";
import mergedTypeDefs from "./TypeDefs/index.js"
import { connectDB } from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";
const app = express()

const httpServer = http.createServer(app)

const MongoDbStore = connectMongo(session)

const store = new MongoDbStore({
    uri: process.env.MONGO_URL,
    collection: "session"
})

store.on("error", (err) => console.log(err))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
    store: store
}))

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start()

app.use(
    '/',
    cors({
        origin: "http://localhost:3000",
        credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
    }),
);

await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

await connectDB()
console.log(`🚀 Server ready at http://localhost:4000/`);

