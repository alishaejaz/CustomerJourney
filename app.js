const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const journeyRoutes = require('./routes/journeyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/customerJourney', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/journey', journeyRoutes);

// Default route
app.get('/', (req, res) => {
  res.send("Customer Journey Mapping Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
