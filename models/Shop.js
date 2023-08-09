const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  shopImage: String,
  shopName: String,
  shopDescription: String,
  shopCategory: String,
  ownerName: String,
  contacts: String,
  address: String,
  lat: Number,
  long: Number,
});

module.exports = mongoose.model('Shop', shopSchema);
