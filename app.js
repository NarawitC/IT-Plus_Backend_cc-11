const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
const notFoundMiddleware = require('./middlewares/notFound');
const errorMiddleware = require('./middlewares/error');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const clientRouter = require('./routes/clientRoutes');
const adminRouter = require('./routes/adminRoutes');
const supplierRouter = require('./routes/supplierRoutes');
const userRouter = require('./routes/userRoutes');
const omiseRouter = require('./routes/omiseRoutes');
// ----------------------------- Sync to create database -----------------------------
// const { sequelize, User } = require('./models/index');
// sequelize.sync({ alter: true });
// ----------------------------- Sync to create database -----------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('', (req, res, next) => {
//   console.log(req.url);
//   console.log('-----------------------------------------');
//   next();
// });

app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/supplier', supplierRouter);
app.use('/admin', adminRouter);
app.use('/omise', omiseRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => console.log(`\n\n\nRunning port ${port}`));
