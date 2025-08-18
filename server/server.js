require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectdb = require('./mongodb/db');
const adminrouter = require('./adminrouter');
const router = require('./router/router');
const paymentrouter=require('./paymentrouter')
const errorMiddleware = require('./error-middleware/error-middleware');

const app = express();

app.use(cors({
  origin: 'https://mern-project-frontends.onrender.com', // frontend URL
  methods: ['GET','POST','PUT','DELETE','PATCH'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));
app.use(express.json());

app.use('/home', router);
app.use('/payment',paymentrouter);
app.use('/admin', adminrouter);


app.get('/', (req, res) => res.send("Server running ✅"));


app.use(errorMiddleware);


const port = 5000||process.env.PORT;
connectdb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
});
