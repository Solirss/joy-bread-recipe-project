const { Router } = require('express');
const recipeController = require('../controllers/recipeController.js')

const router = Router();

router.get('/recipe', authController.signup_get);
router.post('/recipe', authController.signup_post);

module.exports = router; 