const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const existUser = async (username, password) => {
    
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    const result = await db.query(query, [username, password]);

    return result
}


router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({
                message: 'User created successfully',
                result: result
            });
        }
    });
});

// router.post('/signup', (req, res) => {
//     const { username, password } = req.body;

//     // Check if the username already exists
//     const checkQuery = 'SELECT * FROM users WHERE username = ?';
//     db.query(checkQuery, [username], (checkErr, checkResult) => {
//         if (checkErr) {
//             console.error('MySQL error:', checkErr);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             // If the username already exists, return an error
//             if (checkResult.length > 0) {
//                 res.status(409).json({ error: 'Username already exists' });
//             } else {
//                 // If the username doesn't exist, proceed to create the user
//                 const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
//                 db.query(insertQuery, [username, password], (insertErr, result) => {
//                     if (insertErr) {
//                         console.error('MySQL error:', insertErr);
//                         res.status(500).json({ error: 'Internal Server Error' });
//                     } else {
//                         res.status(201).json({
//                             message: 'User created successfully',
//                             result: result
//                         });
//                     }
//                 });
//             }
//         }
//     });
// });


router.get('/login',async (req,res)=>{
    const { username, password } = req.body;
   
   const data = await existUser(username,password)

//    console.log(data)

   res.json({data:[]})
    
});

router.get('/alluser', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('MySQL error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results) {
                res.status(200).json({ data: results });
            } else {
                res.status(401).json({ error: 'Unauthorized response' });
            }
        }
    });


})


module.exports = router;
