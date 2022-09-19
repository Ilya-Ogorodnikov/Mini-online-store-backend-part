require('dotenv').config();
require('./src/middlewares/passport');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const router = require('./src/modules/routes/index');
const errorMiddleware = require('./src/middlewares/error');
const { PORT, URL_DB, CORS_CONFIG } = require('./config');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_CONFIG));
app.use(passport.initialize());
app.use('/assets', express.static('assets'));
app.use('/', router);
app.use(errorMiddleware);

const init = () => {
  try {
    mongoose.connect(URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`App listening: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

init();