const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const existUser = async (username, password) => {

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const result = await db.execute(query, [username, password]);

    return result[0]
}


router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const data = await existUser(username, password)

    if (data.length > 0) {
        res.status(200).json({ message: 'user already exist!' });
    }
    else {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.execute(query, [username, password]).catch((err) => {
            res.status(501).json({ message: err })
        })

        res.status(200).json({ message: 'user created successfully' });
    }
});


router.get('/login', async (req, res) => {

    const { username, password } = req.body;

    const data = await existUser(username, password);
    if (data.length === 0) {
        res.status(401).json({ message: 'Invalid credentials' });
    } else {
        res.json({ message: 'Login successful', data: data });
    }

});

router.get('/alluser',async (req, res) => {
    const query = 'SELECT * FROM users';
    const result = await db.execute(query)
    
    res.status(200).json({ data: result[0] })
})


module.exports = router;
