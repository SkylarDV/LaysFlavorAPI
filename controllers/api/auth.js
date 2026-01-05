const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            status: "success",
            message: "GETTING all users",
            data: { users: users }
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
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        res.json({
            status: "success",
            message: "GETTING user",
            data: { user }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const signup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            status: "error",
            message: "Username and password are required"
        });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            User.register(new User({ username }), password, (err, user) => {
                if (err) return reject(err);
                resolve(user);
            });
        });

        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET || "Jouno");
        return res.json({ 
            status: "success", 
            message: "User registered successfully", 
            data: { 
                username: user.username,
                token: token 
            } });
    } catch (error) {
        if (error.name === 'UserExistsError' || (error.code && error.code === 11000)) {
            return res.status(409).json({ status: "error", message: "Username already in use" });
        }
        return res.status(500).json({ status: "error", message: "User registration failed", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ status: "error", message: "Username and password required" });
        }

        const authenticate = User.authenticate();
        const result = await new Promise((resolve, reject) => {
            authenticate(username, password, (err, user, info) => {
                if (err) return reject(err);
                resolve({ user, info });
            });
        });

        if (result.user) {
            const token = jwt.sign({ _id: result.user._id, username: result.user.username }, process.env.JWT_SECRET || "Jouno");
            return res.json({ status: "success", message: "User logged in successfully", data: { token: token } });
        } else {
            return res.status(401).json({ status: "error", message: "Invalid username or password" });
        }
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Login failed", error: error.message });
    }
}

module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.signup = signup;
module.exports.login = login;