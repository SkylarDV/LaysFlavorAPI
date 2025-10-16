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

const addNew = async (req, res) => {
    let bag = new Bag();
    bag.name = req.body.name;
    bag.flavor = req.body.flavor;

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

module.exports.getAll = getAll;
module.exports.addNew = addNew;