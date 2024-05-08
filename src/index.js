const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3000;

const {
  create
} = require('express-handlebars');
const {
  equal
} = require('assert');
const {
  isEmpty
} = require('validator');


//Connect to DB
db.connect();

//method override
app.use(methodOverride('_method'));

//Handle data from form
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

//XMLHttp Request, ajax, fetch, axios

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      isSeeker: (a) => a === 'seeker',
      isCompany: (a) => a === 'company',
      isNull: (a) => a === null,
      convert: (a) => {
        var date = new Date(a),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");

      },
      isZero: (a) => a == 0,
      isEmpty: (a) => a == '',
      isGender: (a) => a === 'Nữ',
      isApply: (a) => a === false,
      isEqual: (a, b) => a == b,
      isExpired: (a) => a < Date.now(),
      plusOne: (a) => a + 1,
      miniusOne: (a) => a - 1,
    }
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});