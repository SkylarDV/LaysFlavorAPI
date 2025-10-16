const Bag = require('../../models/bag');
bags = [
    { name: "Classic", flavor: "Classic" },
    { name: "Barbecue", flavor: "Barbecue" },
]

const getAll = async (req, res) => {
    try {res.json({
            status: "success",
            message: "GETTING all bags",
            data: { bags: "bags" }
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