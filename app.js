const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const cookieParser = require('cookie-parser')
// const path = require('path')
const dotenv = require('dotenv')
const expressValidator = require('express-validator')
dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Connected To Database") })

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err}`)
})

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(expressValidator())

app.use("/", postRoutes)
app.use("/", authRoutes)
app.use("/", userRoutes)
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "Unauthorized!" });
    }
})

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('frontend/build'))

//     app.get('*', (req,res) => {

//     })
// }

const port = process.env.PORT || 8080
app.listen(port)