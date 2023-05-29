require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/user/user.router');
app.use(express.json());

app.use('/api/user', userRouter);
app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT :", process.env.APP_PORT);
    }
);