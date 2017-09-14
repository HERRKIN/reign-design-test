import app from './app'
import request from 'request-promise-native'
import { Story } from './models'

// I thought of using this but I thought it was better to make sure the app
// fetches the data every hour after the time it was launched, not every
// clock hour

// import {CronJob} from 'cron'
//
// new CronJob('* * * * * *', () => {
//   console.log('You will see this message every second')
// }, null, true, 'America/Santiago')


class dataFetch {
  constructor (args) {
    this.deletedStories = []
    // receives interval in minutes
    this.fetchLoop = setInterval(this.fetchAndSave.bind(this), args.interval * 60 * 1000)
  }

  fetchData () {
    // console.log(this,'fetchData')
    return request({uri: 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs', json: true})
  }

  findDeleted () {
    return Story.find({isDeleted: true})
    .then(deletedStories => {
      const deleted = deletedStories.map(item => item.story_id)
      this.deletedStories = deleted
      return Promise.resolve(deleted)
    })
  }

  saveData (data) {
    // console.log(res.hits[0])
    // console.log(this,'saveData')
    const {hits} = data
    // store deleted stories that are present in current fetch
    let deleted = []
    const promises = hits.map(hit => {
      const {objectID, title, story_title, created_at, author, story_url, url} = hit

      // if there is no title discard
      if ((title || story_title) === null) {
        return Promise.resolve() // goes on, discards the hit save to db
      }

      const story_id = objectID // it always comes in the array or it seems so

      // if the user has deleted the story there is no need to save it
      if(this.deletedStories.includes(story_id)){
        deleted.push(story_id)
        return Promise.resolve()
      }

      const story = new Story({
        story_id,
        title: title || story_title,
        created_at,
        author,
        story_url: story_url || url
      })

      return story.save()
    })

    return Promise.all(promises)
    .then((values) => {
      // get rid of old deleted stories, keep it relevant to current fetch
      this.deletedStories = deleted
      return Story.find({})
    })
    .then((res) => console.log(res.length+' saved'))
  }

  fetchAndSave () {
    // console.log(this,'fetchAndSave')
    // console.log(this.deletedStories)
    return this.findDeleted()
    .then(() => {
      return Story.remove({})
    })
    .then(() => {
      return this.fetchData()
    })
    .then((res) => {
      return this.saveData(res)
    },console.error)
  }

  // .then(() => {
  //   .then(res => {

  // })
}
export default dataFetch;
