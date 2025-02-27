const express = require('express');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

//Connect to DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(mongoSanitize());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
