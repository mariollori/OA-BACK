
module.exports = {
    formvalid: (req, res, next) => {
        const { paciente, persona } = req.body;
        
        //Validations
        const validations = [
            paciente.respuestas == null? false : paciente.respuestas.length< 50 ? false:true,
            persona.nombre.trim()==""? false:persona.apellido.trim()==""?false:true,
            isNaN(persona.edad)?  false : persona.edad.length ==2 ? true : false,
            isNaN(persona.dni)?  false : persona.dni.length == 8? true : false,
            isNaN(persona.telefono)?  false : persona.telefono.length >= 9 ? true : false,
            paciente.departamento.length < 3 ? false : paciente.departamento != null? true:false, 
            paciente.provincia.length < 3 ? false : paciente.provincia != null? true:false ,
            paciente.distrito.length < 3 ? false : paciente.distrito != null? true:false ,
            paciente.como_conocio.length < 5? false :true  ,
            persona.genero.length == 1? true:false,
            paciente.descripcion.trim() == "" ? false :paciente.descripcion.length >= 5?true:false 
        ]
        const timefinal = new Date(process.env.FECHA_F).getTime();
        const timeinicial = new Date(process.env.FECHA_I).getTime();
        const timeactual = new Date().getTime();
        if( timeactual <= timefinal && timeactual >= timeinicial ){
            if (validations.includes(false)) { 
                res.status(400).json('Error al registrar, algunos campos son invalidos!');
            } else {
                next();
            }
        }else{
            res.status(400).json('Por el presente mes no estamos aceptando solicitudes. Gracias.');
        }
         

        
    }
}