var express = require("express");
const router = express.Router();
const User = require("../models/user");

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Creating* One
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
     const user = new User({
         name,
         email,
         password
     })
     try {
        const newUser = await user.save();
        res.status(201).json(newUser);
     } catch (err) {
        res.status(400).json({ message: err.message });
     }
});

// Updating One
router.patch('/:id', getUser, async (req, res) => {
    const { name, email, password } = req.body;
    if (name) {
        res.user.name = name;
    }
    if (email) {
        res.user.email = email;
    }
    if (password) {
        res.user.password = password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.error});
    }
});

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message : 'Cannot find user'});
        }
    } catch (err) {
        return res.status(500).json({ message: err,message });
    }

    res.user = user;
    next();
}

module.exports = router;