const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')
const port = process.env.PORT || 3019;
const app = express()
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas..."))
  .catch(err => console.error("MongoDB connection error:", err));

const user_Schema = new mongoose.Schema({
    Name: String,
    Email: String,
    Message: String
})

const Users = mongoose.model("data", user_Schema)
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://127.0.0.1:5501",
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/post', async (req, res) => {
    console.log('Received POST request:', req.body);
    const { Name, Email, Message } = req.body
    const user = new Users({
        Name,
        Email,
        Message
    })
    try {
        await user.save()
        // console.log('User saved:', user)
        res.json({ message: "Form submitted successfully" })
    } catch (error) {
        // console.error('Error saving user:', error)
        res.status(500).json({ message: "Error submitting form" })
    }
})
app.listen(port, () => {
    console.log("Server started...")
})

