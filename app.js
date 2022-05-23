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
const { sequelize } = require('./models/index');
sequelize.sync({ force: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => console.log(`\n\n\nRunning port ${port}`));
