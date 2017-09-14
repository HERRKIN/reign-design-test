const storyController = {};

storyController.getAll = (req, res, next) => {

  res.render('index', {title: 'HN feed'})
}
export default storyController
