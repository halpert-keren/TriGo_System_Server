const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require("../routes/user.router");
const trailRouter = require("../routes/trail.router");
const groupRouter = require("../routes/group.router");
const requestRouter = require("../routes/request.router");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: true, credentials: true}));
//
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.set('Content-Type', 'application/json');
//     next();
// });

app.use(logger("dev"));

app.use('/api/users', userRouter.router);
app.use('/api/trails', trailRouter.router);
app.use('/api/groups', groupRouter.router);
app.use('/api/requests', requestRouter.router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


app.listen(PORT, () => console.log('Express server is running on port ', PORT));