import express from 'express'
const router = express.Router()
import { MongoClient } from 'mongodb'
import { BlogModel } from '../schema/blog.js'

const client = new MongoClient(process.env.MONGODB_URL)

client
  .connect()
  .then(() => console.log('connected to mongo'))
  .catch(() => console.log('problem connecting'))
  .finally(() => client.close())

/* GET home page. */
router.get('/blog', async (req, res, next) => {
  const blogs = await BlogModel.find({})

  return res.send(blogs.map((blog) => blog.toObject()))
})

/* POST blogs */
router.post('/blog/create-post', async (req, res) => {
  const body = req.body

  const blog = new BlogModel({ content: body.content, title: body.title })

  await blog.save()

  return res.send(blog.toObject())
})

export default router
