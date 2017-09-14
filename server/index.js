import app from './app'
import request from 'request-promise-native'
import mongoose from 'mongoose'
mongoose.Promise = Promise
import { Story } from './models'

// import {CronJob} from 'cron'
//
// new CronJob('* * * * * *', () => {
//   console.log('You will see this message every second')
// }, null, true, 'America/Santiago')

mongoose.connect('mongodb://localhost:27017/reigndesign', {
  useMongoClient: true
})
.then(() => {
  console.log('Contected to mongodb...')
  request({uri: 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs', json: true})
  .then(res => {
    // console.log(res.hits[0])
    const {story_id, title, story_title, created_at, author, story_url} = res.hits[0]
    console.log(res.hits[0])
    const story = new Story({
      story_id,
      title: title || story_title,
      created_at,
      author,
      story_url
    })

    console.log(story)
    Story.remove({}).then(res => story.save())
    app.listen(3000, () => {
      console.log('Running on port 3000...')
    })
  })
})
