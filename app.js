require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/client/user.router');
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/admin', require('./api/admin/admin.router'));

app.listen(process.env.PORT, () => {//dfd
    console.log("Servers up and running on PORT :", process.env.PORT);
    }
);