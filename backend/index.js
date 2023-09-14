const express = require('express');
require('dotenv').config();
const routerDB = require('./routes/router.js')
const app = express();

app.use('/eps', routerDB);

const port = process.env.PORT280;
app.use(express.json());
app.listen(port, () =>{
    console.log(`Puerto Online: http://localhost:${port}`);
})