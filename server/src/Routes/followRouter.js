const Router = require('express');
const router = new Router();
const controller = require('./Controllers/followController');

router.post('/follow', controller.follow);
router.get('/mySubs', controller.getSubscribes);
router.delete('/unfollow', controller.deleteFollow);

module.exports = router;