const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    bagId: { type: Schema.Types.ObjectId, ref: 'Bag', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
voteSchema.index({ bagId: 1, userId: 1 }, { unique: true });
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;