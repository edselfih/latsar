require('dotenv').config();

const path = require('path');

const express = require('express');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const flash = require('express-flash');
const session =  require('express-session');

const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');

const dbUrl = process.env.MONGO_URL

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
    console.log('sukses')
}

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs' , ejsMate);


//session
const secret = 'aaa'
const sesConfig = {
    store: mongoStore.create({
        secret,
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600 // time period in seconds
      }),
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sesConfig));

// Flash
app.use(flash());

// Local Midleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

//Routes:
const homeRoutes = require('./routes/home');
const inputRoutes = require('./routes/input');
const monitoringRoutes = require('./routes/monitoring');
const spjRoutes = require('./routes/spj');

app.use('/', homeRoutes);
app.use('/input', inputRoutes);
app.use('/monitoring', monitoringRoutes)
app.use('/spj', spjRoutes);

app.listen(3000, () => {
    console.log('server aktif')
})





