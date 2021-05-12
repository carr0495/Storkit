const Post = require("../models/Post");

const getUser = require("../utils/getUser");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }, context) {
      try {
        const post = await Post.findOne(postId);
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body, header }, context) {
      const user = getUser(context);

      const newPost = new Post({
        body,
        header,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = getUser(context);
      try {
        const post = await Post.findOne(postId);
        if (post.user === user.id) {
          await Post.deleteOne(postId);
          return post;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
