require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors');
const router = require('./allRoutes');
const corsOptions = {
    origin: "https://oidoamigo.netlify.app",
    // origin: "http://localhost:4200",
    optionsSuccessStatus: 200 
}
app.use(cors())
app.use(express.json())
app.use('/EX3',router)

app.get('/',function (req,res){
    res.send('Bienvenido a Oido Amigo')
})
app.listen(process.env.PORT,cors(corsOptions),()=>{
    console.log('Corriendo en el puerto : ' , process.env.PORT)
})