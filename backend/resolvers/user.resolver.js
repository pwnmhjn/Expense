import { users } from "../dummyData/Data.js"

const userResolver = {
    Query: {
        users: () => {
            return users
        },
        user: (p_, { userId }) => {
            return users.find((user) => user._id === userId)
        }
    },
    Mutation: {}
}

export default userResolver;