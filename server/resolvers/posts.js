import Post from '../models/Post';

export default {
    Query: {
        async getPosts = ()=>{
            try {
                const posts = await Post.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
            

        }
    }
}