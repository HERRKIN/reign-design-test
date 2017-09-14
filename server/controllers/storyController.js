import {Story} from '../models'
const storyController = {};
storyController.getAll = (req, res, next) => {
  Story.find({isDeleted: false}).sort({created_at: 'desc'}).then(stories => {
    // console.log(stories)
    res.render('index', {title: 'HN feed', stories: stories})
  })
}
storyController.delete = (req, res, next) => {
  console.log(req.params.id+' deleted')
  Story.findOneAndUpdate({story_id: req.params.id}, {isDeleted: true})
  .then(() => {
      res.redirect('/')
   })
}
export default storyController
