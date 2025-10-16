const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagSchema = new Schema({
    name: String,
    flavor: String,
});
const Bag = mongoose.model('Bag', bagSchema);

module.exports = Bag;