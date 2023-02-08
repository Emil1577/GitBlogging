const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('.controllers');
const sequelize = require('.config/connection');
const helpres = require('./util/helpres');

const app = express ();
const PORT = process.env.PORT || 3001;

const sess = {

    secret: 'secret password',
    cookie:{
        maxAge : 3600,
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUnintialized: true,

    store: new SequelizeStore({
        db: sequelize,

    }),
};

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(route);

sequelize.sunc({ force: false }).then(() => {

    app.listeners(PORT, () =>
    console.log(
        `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    ))
})


