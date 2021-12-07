import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import passport from 'passport';
import  session from 'express-session';
import routes from './routes';
import path  from 'path';
import dotEnv from 'dotenv';
dotEnv.config();






const app = express();

//Set Up the Assets Folder
// app.use(express.static(path.join(__dirname, 'public')));

// Passport Config
// require('./config/passport')(passport);

// DB Config
// const db = require('./config/keys').MongoURI;

// Db Connection from .env file
const db = process.env.MONGO_URI;

// Connect to MongoDB
if (db !== '[YOUR CONNECTION STRING HERE]') {
    mongoose
      .connect(
        db,
        { useNewUrlParser: true }
      )
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
}

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', routes);


const PORT = process.env.PORT || 8000;


// app.listen(PORT, console.log(`Server started on port ${PORT}`));
app.listen(PORT, process.env.HOST || '0.0.0.0', () => {
  console.info(`Server started on port ${PORT}`) // eslint-disable-line no-console
  console.info(`Environment: ${ process.env.NODE_ENV }`) // eslint-disable-line no-console
})
