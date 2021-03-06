const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

//secrets
const { MONGODB } = require("./config");

//resolvers and typeDefs
const resolvers = require("./server/resolvers");

const typeDefs = gql`
  type Post {
    id: ID!
    header: String!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getAllUsers: [User]
    getUser(userId: ID!): User
  }
  type Mutation {
    createPost(header: String!, body: String!): Post!
    deletePost(postId: ID!): String!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

let port = process.env.PORT || 4000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({ port: port }).then((res) => {
      console.log(`Server ruinning at ${res.url}`);
    });
  });
