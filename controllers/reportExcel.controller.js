const  {pool} = require('../database')






 const estudiantes_con_pacientes_asignados = async (req, res) => {
    try {
       
         const response = await pool.query(  `select distinct  p.nombre,p.apellido,pa.sede, p.genero,p.correo,e.ciclo,e.codigo,e.grupo,pa.nro_pacientes
         from personal_ayuda pa,
         persona p,
         estudiante e,
         asignaciones a
         where 
         pa.idpersona = p.idpersona and e.idpersonal = pa.idpersonal
         and a.idpersonal = pa.idpersonal and a.estado IN ('En Proceso','Finalizado')`);

        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
    }
}


const estudiantes_con_pacientes = async (req, res) => {
    try {
       
         const response = await pool.query(  `select distinct  p.nombre,p.apellido, p.genero,p.correo,e.ciclo,e.codigo,e.grupo,pa.nro_pacientes
         from personal_ayuda pa,
         persona p,
         estudiante e
         where 
         pa.idpersona = p.idpersona and e.idpersonal = pa.idpersonal
         and pa.tipo='estudiante' and pa.sede='UPeU Juliaca' order by pa.nro_pacientes desc`);

        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
    }
}
const psicologos_con_pacientes_asignados = async(req,res)=>{
    try {
        const response = await pool.query(  `select distinct  p.nombre,p.apellido,pa.sede, p.genero,p.correo,psi.grado_academico,psi.n_colegiatura,psi.especialidad,pa.nro_pacientes
        from personal_ayuda pa,
        persona p,
        psicologo psi,
        asignaciones a
        where 
        pa.idpersona = p.idpersona and psi.idpersonal = pa.idpersonal
        and a.idpersonal = pa.idpersonal and a.estado IN ('En Proceso','Finalizado')`);

       return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
    }
}
// const registro_personas_enProceso = async(req,res)=>{
//     try {
//         const response = await pool.query(  `select  a.categoria,
//         (p1.nombre || ''||p1.apellido) AS nombre,p1.telefono,(pa.provincia || ', ' ||pa.distrito || ', '|| pa.departamento) as procedencia,
//         a.descripcion,pe.tipo,a.fecha,(p2.nombre || ''||p2.apellido) AS nombre_personal,pe.sede,a.fecha_asig,p2.correo,p2.telefono as contacto,a.estado
//         from asignaciones a
//         INNER JOIN personal_ayuda pe ON pe.idpersonal = a.idpersonal
//         INNER JOIN paciente pa ON pa.idpaciente = a.idpaciente
//         INNER JOIN persona p1  ON p1.idpersona = pa.idpersona
//         INNER JOIN persona p2 ON  p2.idpersona = pe.idpersona
//         where a.estado IN ('En Proceso')
//         order by a.estado`);
//        return res.status(200).json(response.rows);
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
//     }
// }

// const registro_datos_personas_Atendidas= async(req,res)=>{
//     try {
//         const response = await pool.query(  `select  a.categoria,
//         (p1.nombre || ''||p1.apellido) AS nombre,p1.telefono,(pa.provincia || ', ' ||pa.distrito || ', '|| pa.departamento) as procedencia,pa.ocupacion,pa.religion,p1.genero,pa.estado_civil,pa.grado_educacion,pa.fecha_nacimiento,
//         a.descripcion,pe.tipo,a.fecha,(p2.nombre || ''||p2.apellido) AS nombre_personal,pe.sede,a.fecha_asig,p2.correo,p2.telefono as contacto,a.nro_atenciones
//         from asignaciones a
//         INNER JOIN personal_ayuda pe ON pe.idpersonal = a.idpersonal
//         INNER JOIN paciente pa ON pa.idpaciente = a.idpaciente
//         INNER JOIN persona p1  ON p1.idpersona = pa.idpersona
//         INNER JOIN persona p2 ON  p2.idpersona = pe.idpersona
//         where a.estado ='Finalizado'`);
//        return res.status(200).json(response.rows);
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
//     }
// }
const registro_personasAtendidasEgresados= async(req,res)=>{
    try {
        const response = await pool.query(  `select  a.categoria,
        (p1.nombre || ''||p1.apellido) AS nombre,p1.telefono,(pa.provincia || ', ' ||pa.distrito || ', '|| pa.departamento) as procedencia,pa.ocupacion,pa.religion,p1.genero,pa.estado_civil,pa.grado_educacion,pa.fecha_nacimiento,
        a.descripcion,psi.grado_academico,psi.especialidad,psi.n_colegiatura,a.fecha,(p2.nombre || ''||p2.apellido) AS nombre_personal,pe.sede,a.fecha_asig,p2.correo,p2.telefono as contacto,a.nro_atenciones
        from asignaciones a
        INNER JOIN personal_ayuda pe ON pe.idpersonal = a.idpersonal
        INNER JOIN paciente pa ON pa.idpaciente = a.idpaciente
        INNER JOIN psicologo psi ON psi.idpersonal = pe.idpersonal
        INNER JOIN persona p1  ON p1.idpersona = pa.idpersona
        INNER JOIN persona p2 ON  p2.idpersona = pe.idpersona
        where a.estado ='Finalizado' and pe.tipo='psicologo'`);
       return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
    }
}
const registro_personasAtendidasEstudiantes= async(req,res)=>{
    try {
        const response = await pool.query(  `select  a.categoria,
        (p1.nombre || ''||p1.apellido) AS nombre,p1.telefono,(pa.provincia || ', ' ||pa.distrito || ', '|| pa.departamento) as procedencia,pa.ocupacion,pa.religion,p1.genero,pa.estado_civil,pa.grado_educacion,pa.fecha_nacimiento,
        a.descripcion,e.ciclo,e.codigo,e.grupo,a.fecha,(p2.nombre || ''||p2.apellido) AS nombre_personal,pe.sede,a.fecha_asig,p2.correo,p2.telefono as contacto,a.nro_atenciones
        from asignaciones a
        INNER JOIN personal_ayuda pe ON pe.idpersonal = a.idpersonal
        INNER JOIN paciente pa ON pa.idpaciente = a.idpaciente
        INNER JOIN estudiante e ON e.idpersonal = pe.idpersonal
        INNER JOIN persona p1  ON p1.idpersona = pa.idpersona
        INNER JOIN persona p2 ON  p2.idpersona = pe.idpersona
        where a.estado ='Finalizado' and pe.tipo='estudiante'`);
       return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
    }
}
const registro_datos_personas_canceladas= async(req,res)=>{
    try {
        const response = await pool.query(  `select  a.categoria,
        (p1.nombre || ''||p1.apellido) AS nombre,p1.telefono,(pa.provincia || ', ' ||pa.distrito || ', '|| pa.departamento) as procedencia,
        a.descripcion,a.motivo,pe.tipo,a.fecha,(p2.nombre || ''||p2.apellido) AS nombre_personal,pe.sede,a.fecha_asig,p2.correo,p2.telefono as contacto
        from asignaciones a
        INNER JOIN personal_ayuda pe ON pe.idpersonal = a.idpersonal
        INNER JOIN paciente pa ON pa.idpaciente = a.idpaciente
        INNER JOIN persona p1  ON p1.idpersona = pa.idpersona
        INNER JOIN persona p2 ON  p2.idpersona = pe.idpersona
        where a.estado ='Cancelado'`);
       return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
    }
}
const registro_atenciones= async(req,res)=>{
    try {
        const response = await pool.query(  `select  a.categoria,
        (p1.nombre || ''||p1.apellido) AS nombre,p1.dni,
        pe.tipo,a.fecha,(p2.nombre || ''||p2.apellido) AS nombre_personal,pe.sede,a.fecha_asig,p2.correo,p2.telefono as contacto,
		ra.fecha_sesion,ra.nro_sesion,ra.recomendaciones,ra.acciones_realizadas,ra.observaciones,ra.conclusiones,ra.evidencia
        from asignaciones a
        INNER JOIN personal_ayuda pe ON pe.idpersonal = a.idpersonal
        INNER JOIN paciente pa ON pa.idpaciente = a.idpaciente
        INNER JOIN persona p1  ON p1.idpersona = pa.idpersona
        INNER JOIN persona p2 ON  p2.idpersona = pe.idpersona
		INNER JOIN registro_atencion ra ON ra.idasignacion = a.idasignacion 
        where a.estado ='Finalizado'
		order by nombre,nro_sesion`);
       return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Ocurrio un Problemas con el servidor interno!.');
    }
}

module.exports={
    estudiantes_con_pacientes_asignados,
    psicologos_con_pacientes_asignados,
    // registro_personas_enProceso,
    registro_personasAtendidasEgresados,
    estudiantes_con_pacientes,
    registro_personasAtendidasEstudiantes,
    registro_datos_personas_canceladas,
    registro_atenciones,
}