const Recipe = require('../models/recipe.js');

module.exports.recipeMake_post = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body); // Creates a new recipe document
    await newRecipe.save(); // Saves the document to the database
    res.status(201).json(newRecipe); // Responds with the saved recipe
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handles validation errors
  }
};

module.exports.recipeMake_get = (req, res) => {
  res.render('recipeMake')
}