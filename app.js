const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware.js');
const Recipe = require('./models/recipe.js');
//const ingredientSub = require('./models/recipe.js');


const app = express();

// middleware
app.use(express.static('public'));
//We need to use express.json when we want to take in json from the user side 
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Joy-bread:13888147114@cluster0.aza85.mongodb.net/Joy-bread';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));


// testing recipe creating
app.post('/recipe', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body); // Creates a new recipe document
    await newRecipe.save(); // Saves the document to the database
    res.status(201).json(newRecipe); // Responds with the saved recipe
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handles validation errors
  }
});

app.use(authRoutes);
