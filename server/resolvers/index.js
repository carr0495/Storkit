import postResolvers from "./posts";

export default {
  Query: {
    ...postResolvers.Query,
  },
};
