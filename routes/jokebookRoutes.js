const express = require("express");
const router = express.Router();
const controller = require('../controllers/jokebookController');

router.get('/categories', controller.fetchCategories);
router.get('/category/:category', controller.fetchJokesByCategory);
router.get('/random', controller.fetchJokesRandom);
router.post('/joke/add', controller.createJoke);

module.exports = router;