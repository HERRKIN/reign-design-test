import app from './app'
import mongoose from 'mongoose'
mongoose.Promise = Promise
import DataFetch from './dataFetch'

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
