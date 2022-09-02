const  {pool} = require('../database')
const help =  require('../helpers/getSemestres')


 const registrar_semestre = async (req, res) => {
    try {
        const {semestre} = req.body;
        const timefinal = new Date(process.env.FECHA_F).getTime();
        const timeactual = new Date().getTime();
     
        if( timefinal == '' ){
            const response = await pool.query('insert into semestres(nombre,fecha_final,fecha_inicial) values($1,$2,$3) ', [ semestre.nombre, semestre.fecha_final, semestre.fecha_inicial]);
            help.get_semestre();
        }
        else if( timeactual > timefinal){
            const response = await pool.query('insert into semestres(nombre,fecha_final,fecha_inicial) values($1,$2,$3) ', [ semestre.nombre, semestre.fecha_final, semestre.fecha_inicial]);
            /**Agregar verificacion si es psicologo o estudiante */
            const response2 = await pool.query('update personal_ayuda set nro_pacientes=0 where estado in (2,3)')
            help.get_semestre();
        }else{
            
            throw 'Aun no termina el periodo actual, porfavor espere a que se acabe para poder registrar uno nuevo.'
        }
         
        return res.status(200).json({"message":"Se registro el nuevo semestre"});   
    } catch (e) {
        console.log(e)
        return res.status(500).json({"message":e}
            );
    }
}
const update_semestre = async (req, res) => {
    try {
        console.log(req.body)
        const {fecha_final} = req.body;
        const id = req.params.id;
        const response = await pool.query('update semestres set fecha_final = $1 where idsemestre=$2 ',[fecha_final,id]);
        await help.get_semestre(); 
        console.log(process.env.FECHA_F)
        return res.status(200).json({"message":"Se modifico la fecha de cierre correctamente"});
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

const get_semestre = async (req, res) => {
    try {
         const response = await pool.query('select * from semestres');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const get_last_semestre = async (req, res) => {
    try {
         const response = await pool.query('select * from semestres order by idsemestre desc limit 1');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json(e);
    }
}

module.exports = {
registrar_semestre,
update_semestre,
get_last_semestre,
get_semestre
}