const mongoose = require('mongoose');
const Vote = require('../../models/vote');

const getAll = async (req, res) => {
    try {
        const votes = await Vote.find();
        res.json({
            status: "success",
            message: "GETTING all votes",
            data: { votes: votes }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const addNew = async (req, res) => {
    // Accept a userId in the request body (dev/testing mode) and bagId in the URL
    const userId = req.body && req.body.userId;
    const bagId = req.params.bagId;

    // No authentication required for this endpoint (dev mode)
    if (!userId) {
        return res.status(400).json({ status: "error", message: "userId is required in request body" });
    }

    if (!mongoose.isValidObjectId(bagId) || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ status: "error", message: "Invalid bagId or userId" });
    }

    try {
        const exists = await Vote.findOne({ bagId: bagId, userId: userId }).lean();
        if (exists) {
            return res.status(409).json({ status: "error", message: "Already voted" });
        }

        const vote = await Vote.create({ bagId: bagId, userId: userId });
        res.status(201).json({
            status: "success",
            message: "Vote added",
            data: { vote: vote }
        });
    } catch (error) {
        // handle unique index duplicate just in case
        if (error.code === 11000) {
            return res.status(409).json({ status: "error", message: "Already voted" });
        }
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteOne = async (req, res) => {
    try {
        const bagId = req.params.bagId;
        const userId = req.userId || (req.user && (req.user._id || req.user.id));

        if (!userId) {
            return res.status(401).json({ status: "error", message: "Authentication required" });
        }
        if (!mongoose.isValidObjectId(bagId)) {
            return res.status(400).json({ status: "error", message: "Invalid bag id" });
        }

        const deletedVote = await Vote.findOneAndDelete({ bagId: bagId, userId: userId });
        if (!deletedVote) {
            return res.status(404).json({
                status: "error",
                message: "Vote not found"
            });
        }
        res.json({
            status: "success",
            message: "Vote Deleted",
            data: { vote: deletedVote }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports.getAll = getAll;
module.exports.addNew = addNew;
module.exports.deleteOne = deleteOne;