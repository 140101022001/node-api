const express = require('express');
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { create, login, getUserById } = require('./services/auth');
const AuthMiddleware = require('./middleware/AuthMiddleware');
const LoginMiddleware = require('./middleware/LoginMiddleware');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({
    path: '.env'
})

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/', AuthMiddleware, (req, res) => {
    console.log(req.session);
    return res.sendFile(path.join(__dirname) + '/index.html')
})

app.get('/login', LoginMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname) + '/login.html')
})

app.post('/login', LoginMiddleware, async (req, res) => {
    const data = await login(req.body);
    if (!data) {
        return res.status(400).json({ message: "Invalid credentials" })
    }
    let expires = '1m';
    if (req.body.remember) {
        expires = '1h';
        req.session.cookie.maxAge = 60 * 60 * 1000;
    }
    req.session.isLoggedin = true;

    const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY, {
        expiresIn: expires
    })
    return res.status(200).json({ message: 'ok', accessToken: token })
})

app.get('/logout', AuthMiddleware, (req, res) => {
    req.session.isLoggedin = false;
    return res.status(200).json({ message: 'ok' })
})

app.get('/register', LoginMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname) + '/register.html')
})

app.post('/register', LoginMiddleware, async (req, res) => {
    const data = req.body;
    try {
        const result = await create(data);
        res.status(201).json({ message: "User created successfully!" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})

app.get('/profile', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const data = verifyToken(token);
    if(!data) {
        res.status(400).json({ message: 'Token expired!' });
    }
    const user = await getUserById(data.id);
    if (!user) {
        res.status(400).json({ message: 'User not found!' });
    }
    delete user.password
    res.status(200).json({ user })
})

app.get('*', (req, res) => {
    res.send('Not Found')
})

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    } catch (err) {
        console.error('Error verifying token:', err);
        return null;
    }
}

const PORT = +process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
})