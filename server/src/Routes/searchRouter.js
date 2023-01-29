const Router = require('express');
const router = new Router();
const controller = require('./Controllers/searchController');


router.get('/post', controller.getPosts);
router.get('/user', controller.getUsers);

module.exports = router;