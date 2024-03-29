const  {pool} = require('../database')

 const get_nombre_usuario = async(req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select  p.nombre,p.apellido from persona p,personal_ayuda u  where u.idpersonal = $1 and u.idpersona= p.idpersona ', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Error Interno...!');
    }
}

 const get_datos_usuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select p.idpersona, p.nombre,p.apellido,p.telefono,p.correo,p.genero,p.tipo,u.universidad,u.edad,u.ciclo,u.grupo,u.foto,u.especialidad,u.n_colegiatura,u.codigo from persona p ,personal_ayuda  u where u.idpersonal=$1 and u.idpersona=  p.idpersona ', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Error Interno...!');
    }
}


 const get_datos_personales = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select p.idpersona, p.nombre,p.apellido,p.telefono,p.correo,p.genero from persona p ,personal_ayuda  u where u.idpersonal=$1 and u.idpersona=  p.idpersona ', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Error Interno...!');
    }
}

 const get_datos_academicos = async (req, res) => {
    try {
        
        const id = parseInt(req.params.id);
        const tipo = await pool.query('select tipo from personal_ayuda where idpersonal =$1',[id]);
        var response;
        if(tipo.rows[0].tipo == 'estudiante'){
            response = await pool.query('select pa.foto,e.ciclo,e.grupo,e.codigo,pa.tipo from personal_ayuda pa,estudiante e  where pa.idpersonal=$1  and e.idpersonal=pa.idpersonal', [id]);
        }else if(tipo.rows[0].tipo == 'psicologo'){
            response = await pool.query('select pa.foto,p.n_colegiatura,p.grado_academico,p.especialidad,pa.tipo from personal_ayuda pa,psicologo p  where pa.idpersonal=$1 and p.idpersonal=pa.idpersonal ', [id]);
        }else{

        }
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Error Interno...!');
    }
}

 const getuserstocompare = async (req, res) => {
    try {
        console.log('asdasd')
        const response = await pool.query('select username from usuario');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json('asdasd');
    }
}





 const modificar_datos_personales = async (req, res) => {
    try {
        const  {persona}=req.body;
        const valid = await pool.query('select pe.idpersona from personal_ayuda pa,persona pe  where pa.estado!=1 and  pa.idpersona = pe.idpersona   and pe.correo = $1', [persona.correo]);
        if(valid.rowCount == 0 ){
            const response = await pool.query('update persona set correo=$1,telefono=$2 where idpersona = $3',
            [persona.correo,persona.telefono,persona.idpersona]);
           return res.status(200).json(  `Datos personales guardados.`  );
        }else{
            if(valid.rows[0].idpersona == persona.idpersona){
                const response = await pool.query('update persona set correo=$1,telefono=$2 where idpersona = $3',
                [persona.correo,persona.telefono,persona.idpersona]);
               return res.status(200).json(  `Datos personales guardados.`  );
            }else{
                return res.status(500).json(  `Este correo ya se registro, por favor ingrese otro.`  );
            }
        }
     
     
    } catch (e) {
        console.log(e);
        return res.status(500).json('Error Interno...!');
    }
}






 const getasignaciondata = async (req, res) => {
    try {
        const idpaciente = parseInt(req.params.id);
        const response = await pool.query(
            `select pa.universidad,pa.idpersonal, p.nombre,p.apellido,p.telefono,p.correo,pa.foto
            from persona p, personal_ayuda pa, asignaciones a
            where a.idpaciente=$1 and
            a.idpersonal=pa.idpersonal and
            pa.idpersona = p.idpersona `, 
             [idpaciente]);
        return res.status(200).json(response.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Error Interno...!');
    }
}




 const getpersonadata = async (req, res) => {
    try {
        const idpersona = parseInt(req.params.id);
        const response = await pool.query(
            `select p.nombre,p.apellido,p.genero,p.tipo,p.idpersona,pa.estado from persona p,paciente pa where pa.idpersona=$1 and pa.idpersona=p.idpersona `, 
             [idpersona]);
        return res.status(200).json(response.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Error Interno...!');
    }
}






const getNameOfRol = async (req,res)=>{
    try {
        const id = req.params.id;
        const response = await pool.query(`
        select r.nombre from
        usuario u,
        personal_ayuda pa,
        rol r,
        usuario_rol ur 
        where pa.idpersonal = $1 and 
        u.idusuario = pa.idusuario and
        ur.idusuario = u.idusuario and
        ur.idrol = r.idrol
        `,[id])
        return res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json(error);
    }
}


//  const estadisticas_generales_tipo_sede_fecha = async (req, res) => {
//     try {
//         const tipo = req.query.tipo.toString();
//         const sede = req.query.sede.toString();
//         const fechai = req.query.fechai;
//         const fechaf = req.query.fechaf;
//         var response ;
//         if(tipo=="todos"){
//             response = await pool.query(`
//             select  asig.estado ,count(*)
//             from asignaciones asig,personal_ayuda pa
//             where pa.idpersonal = asig.idpersonal and asig.fecha >= $1 and asig.fecha <= $2  and pa.sede =$3
//              group by asig.estado` ,[fechai,fechaf,sede]);
//         }else{
//              response = await pool.query(`
//             select  asig.estado ,count(*)
//             from asignaciones asig,personal_ayuda pa
//             where pa.idpersonal = asig.idpersonal and asig.fecha >= $1 and asig.fecha <= $2  and pa.tipo = $3 and pa.sede =$4
//              group by asig.estado` ,[fechai,fechaf,tipo,sede]);
//         }
      
//         return res.status(200).json(response.rows);
//     } catch (e) {
//         return res.status(500).json(e);
//     }
// }



//  const obtenerestadisticas_fecha = async (req, res) => {
//     try {
//         console.log(req.query.id)
//         const id = req.query.id;
//         const fechai = req.query.fechai;
//         const fechaf = req.query.fechaf;


//         const response = await pool.query(`
//         select  asig.estado ,count(*)
//         from paciente p
//         ,asignaciones asig
//          where asig.idpersonal = $1 and
// 		 asig.fecha >= $2 and asig.fecha <= $3 and
// 		 asig.idpaciente = p.idpaciente
//            group by asig.estado`, [id, fechai, fechaf]);
//         return res.status(200).json(response.rows);
//     } catch (e) {
//         return res.status(500).json(e);
//     }
// }

module.exports={
    get_nombre_usuario,
get_datos_usuario,
get_datos_personales,
get_datos_academicos,
getasignaciondata,
getpersonadata,
getNameOfRol,
getuserstocompare,
modificar_datos_personales,
// estadisticas_generales_tipo_sede_fecha,
// obtenerestadisticas_fecha
}