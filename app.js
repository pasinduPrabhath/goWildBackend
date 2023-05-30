require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/user/user.router');
app.use(express.json());

app.use('/api/user', userRouter);
app.listen(PORT, () => {//dfd
    console.log("Servers up and running on PORT :", PORT);
    }
);