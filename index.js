const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});