const userTypeDef = `#graphql
type User {
    _id:ID!
    username:String!
    password:String!
    profilePicture:String
    gender:String!
}

type Query {
    users:[User!]
    authUser:User
    user(userId:ID!):User
}

type Mutation {
    signUp(input:SignUpInput):User
    login(input:LogInInput):User
    logout:LogoutResponse
}

input SignUpInput {
    username:String!
    name:String!
    password:String!
    gender:String!
}

input LogInInput {
    username:String!
    name:String!
    password:String!
    gender:String!
}

type LogoutResponse {
    message:String!
}
`

export default userTypeDef;