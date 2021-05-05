import { ApolloServer } from "apollo-server";
import gql from "graphql";
import mongoose from "mongoose";

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
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
`;
