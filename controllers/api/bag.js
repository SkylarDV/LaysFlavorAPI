const Bag = require('../../models/bag');


const getAll = async (req, res) => {
    const bags = await Bag.find();
    try {
        res.json({
            status: "success",
            message: "GETTING all bags",
            data: { bags: bags }
        }); 
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getOne = async (req, res) => {
    try {
        const bagId = req.params.id;
        const bag = await Bag.findById(bagId);
        if (!bag) {
            return res.status(404).json({
                status: "error",
                message: "Bag not found"
            });
        }
        res.json({
            status: "success",
            message: "GETTING bag",
            data: { bag }
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
    let bag = new Bag();
    bag.name = req.body.name;
    bag.flavor = req.body.flavor;
    bag.colour = req.body.colour;
    bag.textColour = req.body.textColour;
    bag.font = req.body.font;
    bag.bagImage = req.body.bagImage;
    bag.creator = req.body.creator;

    bag.save()
        .then(doc => {
            res.json({
                status: "success",
                message: "Bag Saved",
                data: { bag: doc }
            });
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: err.message
            });
        });
};

const updateOne = async (req, res) => {
    try {
        const bagId = req.params.id;

        const updateData = {};
        if (req.body.name !== undefined) updateData.name = req.body.name;
        if (req.body.flavor !== undefined) updateData.flavor = req.body.flavor;
        if (req.body.colour !== undefined) updateData.colour = req.body.colour;
        if (req.body.textColour !== undefined) updateData.textColour = req.body.textColour;
        if (req.body.font !== undefined) updateData.font = req.body.font;
        if (req.body.bagImage !== undefined) updateData.bagImage = req.body.bagImage;
        if (req.body.creator !== undefined) updateData.creator = req.body.creator;

        const updated = await Bag.findByIdAndUpdate(
            bagId,
            updateData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                status: "error",
                message: "Bag not found"
            });
        }

        res.json({
            status: "success",
            message: "Bag Updated",
            data: { bag: updated }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deleteOne = async (req, res) => {
    try {
        const bagId = req.params.id;
        const deleted = await Bag.findByIdAndDelete(bagId);
        if (!deleted) {
            return res.status(404).json({
                status: "error",
                message: "Bag not found"
            });
        }
        res.json({
            status: "success",
            message: "Bag Deleted",
            data: { bag: deleted }
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
module.exports.getOne = getOne;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;