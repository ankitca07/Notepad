// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config(); // Load .env variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON data

// API Routes
app.get('/', (req, res) => res.send('API is running...')); // Simple test route
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Error Handling Middleware (should be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));