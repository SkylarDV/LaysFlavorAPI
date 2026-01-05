const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagSchema = new Schema({
    name: String,
    flavor: String,
    colour: String,
    textColour: String,
    font: String,
    bagImage: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
});
const Bag = mongoose.model('Bag', bagSchema);

module.exports = Bag;