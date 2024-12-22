import { Router, Request, Response } from 'express';
import {authenticateJwt , SECRET}from '../middleware'; 
import {Post } from '../db';
const router = Router() ; 

router.post('/posts', authenticateJwt, async (req: Request, res: Response) => {
    try {
        const { title, imgUrl , content } = req.body;
        const userId = req.headers["userId"] ; 
        // Simulate AI-powered summary generation
        const summary = content.substring(0, 200) + '...';

        const newPost = new Post({ title, content, imgUrl ,  summary, author: userId });
        await newPost.save();

        res.status(201).json(newPost);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/posts' , async(req , res)=>{
    try {
        const posts = await Post.find().populate('author', 'username email');
        res.status(200).json(posts);
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
})

//@ts-ignore
router.get('/posts/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
      const post = await Post.findById(req.params.id).populate('author', 'name email');
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //@ts-ignore
  router.get('/users/:id/posts', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userPosts = await Post.find({ author: id }).populate('author', 'username email');

        if (userPosts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }

        res.status(200).json(userPosts);
    } catch (err : any) {
        res.status(500).json({ error: err.message });
    }
});

//@ts-ignore
router.delete('/posts/:id', async (req: Request, res: Response) => {

    try {
        const post = await Post.findById(req.params.id);
        //@ts-ignore
        await post.deleteOne();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err:any) {
        res.status(500).json({ error: err.message });
    }
});


export default router ; 