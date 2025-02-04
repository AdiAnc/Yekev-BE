const express = require('express');
const cors = require('cors');
const connectcustomerDB = require('../configs/db');

const customerRouter = require('../routes/customerRouter');
const orderRouter = require('../routes/orderRouter');

const app = express();

connectcustomerDB();

app.use(cors());

app.use('/', express.json());


const generateRoute = (app) =>{


}

app.listen(4000, () => console.log('Server running on port 4000'));

module.exports = router;
