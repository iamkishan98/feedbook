const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./db/db");
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

//Load configurations
dotenv.config({ path: "./config/config.env"});

// Passport config for passport.js
require('./config/passport')(passport);

const app = express();

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));


app.set('view engine', '.hbs');
app.set('views','./views/')

// Static directory from where app loads resources
app.use(express.static( path.join(__dirname,'public')) );

//app.use(express.urlencoded({extended : false}));
app.use(express.json());

// express-session
app.use(session({
    secret : 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Initialize passport middleware
app.use(passport.initialize())

// passport Session initialization
app.use(passport.session())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));

}

const PORT = process.env.PORT || 5000;

const Login = require("./routes/index.js");

// Routes
app.use('/', Login);

// Redirecting to authentication with google
app.use('/auth', require('./routes/auth'));


app.listen(PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`);
});

connectDB();