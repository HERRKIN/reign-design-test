import app from './app'
import request from 'request-promise-native'
import mongoose from 'mongoose'
mongoose.Promise = Promise
import DataFetch from './dataFetch'

// I thought of using this but I thought it was better to make sure the app
// fetches the data every hour after it was launched, not every hour on the clock

// import {CronJob} from 'cron'
//
// new CronJob('* * * * * *', () => {
//   console.log('You will see this message every second')
// }, null, true, 'America/Santiago')

mongoose.connect('mongodb://localhost:27017/reigndesign', {
  useMongoClient: true
})
.then(() => {
  console.log('connected to mongodb...')
  const df = new DataFetch({interval: 60}) // interval in minutes (1hr)
  return df.fetchAndSave() // it runs once, then every interval minutes  as defined in the constructor
})
.then(() => {
  app.listen(3000, () => {
    console.log('Running on port 3000...')
  })
})
