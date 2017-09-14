import {Story} from '../models'
const storyController = {};
storyController.getAll = (req, res, next) => {
  Story.find({}).then(stories => {
    console.log(stories)
    res.render('index', {title: 'HN feed', stories: stories})
  })
}
export default storyController
