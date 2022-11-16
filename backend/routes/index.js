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

/* GET all blogs */
router.get('/blog', async (req, res, next) => {
  const blogs = await BlogModel.find({})

  return res.send(blogs.map((blog) => blog.toObject()))
})

/* POST new blog */
router.post('/blog/create-post', async (req, res) => {
  const body = req.body

  const blog = new BlogModel({ content: body.content, title: body.title })

  console.log('HI')
  await blog.save().catch((err) => {
    console.log('ERROR', err)
    return res.status(400).send("The request didn't go through")
  })

  return res.send(blog.toObject())
})

/* PUT edit blog */
router.put('/blog/edit-post', async (req, res) => {
  const body = req.body

  const item = await BlogModel.findById(body.id)

  if (!item) {
    return res.status(404).send('No item found with this id')
  }

  item.title = body.title
  item.content = body.content

  await item.save()

  const blogs = await BlogModel.find({})

  return res.send(blogs.map((blog) => blog.toObject()))
})

/* DELETE  */
router.delete('/blog/delete-post', async (req, res) => {
  const body = req.body

  const item = await BlogModel.findById(body.id)

  if (!item) {
    return res.status(404).send('No item found with this id')
  }

  await BlogModel.deleteOne({ _id: body.id })

  const blogs = await BlogModel.find({})

  return res.send(blogs.map((blog) => blog.toObject()))
})

export default router
