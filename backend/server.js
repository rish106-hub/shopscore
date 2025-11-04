const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth-routes.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// Middleware - order matters!
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send("<h1>Hello from Express server</h1>");
});

app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});