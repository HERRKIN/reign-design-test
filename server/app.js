import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import apiRoutes from './api-routes'
import routes from './routes'

const app = express()

// view engine
const viewPath = path.join(__dirname, 'views')
console.log(viewPath)
app.set('views', viewPath)
app.set('view engine', 'jade')

// Middleware
app.use(bodyParser.json())
app.use('/', routes)
app.use('/api', apiRoutes)
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      title: 'HN feed',
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

export default app
