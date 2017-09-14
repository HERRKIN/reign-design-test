import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const storySchema = new Schema({
  story_id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  story_url: {
    type:String,
    required:true
  },
  created_at: {
  type: Date,
  required: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
})


const Story = mongoose.model('Story', storySchema)
export default Story
