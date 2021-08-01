const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors');
app.use( cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
require('./server/config/config.mongoose')
require('dotenv').config()

require('./server/routes/product.route')(app);

app.listen(8000, () => console.log('Now listening on port 8000'));
