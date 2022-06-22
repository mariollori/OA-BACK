require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors');
const router = require('./allRoutes');

app.use(cors())
app.use(express.json())
app.use('/EX3',router)

app.get('/',function (req,res){
    res.send('Bienvenido a Oido Amigo')
})
app.listen(process.env.PORT,()=>{
    console.log('Corriendo en el puerto : ' , process.env.PORT)
})