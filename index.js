const express = require('express');
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { create, login } = require('./services/auth');
const AuthMiddleware = require('./middleware/AuthMiddleware');
const LoginMiddleware = require('./middleware/LoginMiddleware');
const dotenv = require('dotenv');
dotenv.config({
    path: '.env'
})

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 1000 }
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization',
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.get('/',AuthMiddleware, (req, res) => {
    console.log(req.session);
    return res.sendFile(path.join(__dirname) +'/index.html')
})

app.get('/login', LoginMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname) +'/login.html')
})

app.post('/login', LoginMiddleware, async (req, res) => {
    const data = await login(req.body);
    if (!data) {
        return res.status(400).json({ message: "Invalid credentials"})
    }
    if (req.body.remember) {
        req.session.cookie.maxAge = 60 * 60 * 1000;
    }
    req.session.isLoggedin = true;
    return res.status(200).json({message: 'ok'})
})

app.get('/logout', AuthMiddleware, (req, res) => {
    req.session.isLoggedin = false;
    return res.status(200).json({message: 'ok'})
})

app.get('/register', LoginMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname) +'/register.html')
})

app.post('/register', LoginMiddleware, async (req, res) => {
    const data = req.body;
    try {
        const result = await create(data);
        res.status(201).json({ message : "User created successfully!"})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
})

app.get('*', (req, res) => {
    res.send('Not Found')
})

const PORT = +process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
})