import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
})

export const BlogModel = model('Blog', blogSchema)
