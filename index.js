const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/money_tracker', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

// Create Expense model
const Expense = mongoose.model('Expense', {
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort('-date');
    res.json(expenses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/expenses', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
