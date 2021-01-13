const express = require("express");
const logger = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;

// const someRouter = require("./routers/some.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Content-Type', 'application/json');
    next();
});

app.use(logger("dev"));

// app.use('/api/somes', someRouter.router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


app.listen(PORT, () => console.log('Express server is running on port ', PORT));