const express = require('express');
const appe = express();

const persona = require('./routes/consultante.routes')
appe.use('/persona',persona)

const reporte = require('./routes/reportes.routes')
appe.use('/reporte',reporte)

const usuario = require('./routes/usuario.routes')
appe.use('/usuario',usuario)

const auth = require('./routes/auth.routes')
appe.use('/auth',auth)


const opciones = require('./routes/roles.routes')
appe.use('/opcion', opciones)



const datos_psicologo = require('./routes/datos.personal.routes')
appe.use('/datos_psicologo', datos_psicologo)


const paciente= require('./routes/paciente.routes')
appe.use('/paciente', paciente)

const bandeja= require('./routes/bandeja.routes')
appe.use('/bandeja',bandeja)



const psi= require('./routes/solicitudes.routes')
appe.use('/psicologo', psi)

const exc = require('./routes/reportExcel.routes')
appe.use('/excel',exc)


const semestre = require('./routes/semestre.routes')
appe.use('/semestre',semestre)

module.exports = appe;


