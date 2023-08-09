const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/nearbyshops', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const shopRoutes = require('./routes/shopRoutes');

app.use('/api', shopRoutes);
