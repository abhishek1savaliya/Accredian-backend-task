const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const generateToken = (user) => {
    const payload = {
        username: user.username,
    };
    const secretKey = 'abhishek';
    const options = { expiresIn: '12h' };

    return jwt.sign(payload, secretKey, options);
};

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(403).json({ message: 'Token is missing' });
        }

        jwt.verify(token, 'abhishek', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const existUser = async (username, password) => {
    try {
        const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
        const result = await db.execute(query, [username, password]);

        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

router.post('/signup', async (req, res) => {

    try {
        const { username, password } = req.body;

        const data = await existUser(username, password);

        if (data.length > 0) {
            res.status(200).json({ message: 'user already exists!' });
        } else {
            const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
            await db.execute(query, [username, password]);
            res.status(200).json({ message: 'user created successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const data = await existUser(username, password);

        if (data.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
        } else {
            const token = generateToken(data[0]);
            res.json({ message: 'success', token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/alluser', verifyToken, async (req, res) => {
    try {
        const query = 'SELECT * FROM user';
        const result = await db.execute(query);

        res.status(200).json({ data: result[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
