
const  {pool} = require('../database')


    const get_semestre = async () => {
        try {
                           
           const response =  await pool.query('select * from semestres order by idsemestre desc limit 1')
        
           process.env.IDSEM  =  response.rows[0].idsemestre;
           process.env.FECHA_F = response.rows[0]?.fecha_final;
           process.env.FECHA_I = response.rows[0]?.fecha_inicial;
           process.env.SEMESTRE = response.rows[0]?.nombre;
        } catch (e) {
            console.log(e);
        }
    }
    



module.exports={
get_semestre
}