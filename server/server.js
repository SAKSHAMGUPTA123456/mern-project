require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectdb = require('./mongodb/db');
const adminrouter = require('./adminrouter');
const router = require('./router/router');
const errorMiddleware = require('./error-middleware/error-middleware');

const app = express();

// ✅ Apply CORS to all routes
app.use(cors({
  origin: 'https://thapaservices-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
  
}));

// ✅ Remove manual OPTIONS handler — let cors handle it!
// ❌ REMOVE this block completely
// app.use((req, res, next) => { ... })

app.use(express.json());

// ✅ API routes
app.use('/home', router);
app.use('/admin', adminrouter);

// ✅ Root route
app.get('/', (req, res) => res.send("Server running ✅"));

// ✅ Error handler
app.use(errorMiddleware);

// ✅ Server start
const port = process.env.PORT || 5000;
connectdb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
});
