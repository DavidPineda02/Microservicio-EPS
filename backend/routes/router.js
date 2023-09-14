const express = require('express');
const {MongoClient} = require('mongodb');

require('dotenv').config;
const router = express.Router();
const uriDB = process.env.DDBB280;

const nombreDB = "Eps";

/* router.get('/gg', async (req, res) =>{
    try {
        res.json("GOOD")
    } catch (e) {
        res.json("BAD")
    }
}); */

//? Obtener todos los pacientes de manera alfabética.
router.get('/ejs1', async(req,res)=>{
    try {   
        const client = new MongoClient(uriDB);
        await client.connect();
        const db = client.db(nombreDB)
        const collection = db.collection("Usuarios");
        const result = await collection.find().sort({ nombre: 1 }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404);
        res.send({error: "ERROR"});
    }
});

//? Obtener las citas de una fecha en específico , donde se ordene los pacientes de manera alfabética.
router.get('/ejs2', async(req,res)=>{
    try {   
        const client = new MongoClient(uriDB);
        await client.connect();
        const db = client.db(nombreDB)
        const collection = db.collection("Citas");
        const result = await collection.find({ fecha: "2023-01-15"}).sort({ datosUsuario: 1 }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404);
        res.send({error: "ERROR"});
    }
});

//? Obtener todos los médicos de una especialidad en específico
router.get('/ejs3', async(req,res)=>{
    try {   
        const client = new MongoClient(uriDB);
        await client.connect();
        const db = client.db(nombreDB)
        const collection = db.collection("Medico");
        const result = await collection.find({ especialidad: "Psiquiatría" }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404);
        res.send({error: "ERROR"});
    }
});

//! Encontrar la próxima cita para un paciente en específico
router.get('/ejs4', async(req,res)=>{
    try {   
        const client = new MongoClient(uriDB);
        await client.connect();
        const db = client.db(nombreDB)
        const collection = db.collection("Citas");
        const result = await collection.aggregate([
            {
                $match: {
                    
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404);
        res.send({error: "ERROR"});
    }
});

//? Encontrar todos los pacientes que tienen citas con un médico en específico
router.get('/ejs5', async(req,res)=>{
    try {   
        const client = new MongoClient(uriDB);
        await client.connect();
        const db = client.db(nombreDB)
        const collection = db.collection("Citas");
        const result = await collection.aggregate([
            {
                $match: {
                  medico: "Ana Martínez"
                }
            },
            {
                $group: {
                  _id: {
                    nombre: "$datosUsuario.nombre",
                    apellido: "$datosUsuario.apellido"
                  }
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404);
        res.send({error: "ERROR"});
    }
});

//? Encontrar todas las citas de un día en específico
router.get('/ejs6', async(req,res)=>{
    try {   
        const client = new MongoClient(uriDB);
        await client.connect();
        const db = client.db(nombreDB)
        const collection = db.collection("Citas");
        const result = await collection.find({ fecha: "2023-09-14" }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404);
        res.send({error: "ERROR"});
    }
});

//? Obtener todos los médicos con sus consultorios correspondientes.
router.get('/ejs7', async(req,res)=>{
    try {   
        const client = new MongoClient(uriDB);
        await client.connect();
        const db = client.db(nombreDB)
        const collection = db.collection("Medico");
        const result = await collection.find(
            {}, { projection: {_id: 0, nombre: 1, consultorio: 1}}
        ).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404);
        res.send({error: "ERROR"});
    }
});

//? Contar el número de citas que un médico tiene en un día específico
router.get('/ejs8', async(req,res)=>{
    try {   
        const client = new MongoClient(uriDB);
        await client.connect();
        const db = client.db(nombreDB)
        const collection = db.collection("Citas");
        const result = await collection.aggregate([
            {
                $match: {
                  "medico": "María Rodríguez",
                  "fecha": "2023-07-12"
                }
            },
            {
                $group: {
                  _id: "$medico",
                  citasDia: { $sum: 1 }
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404);
        res.send({error: "ERROR"});
    }
});


module.exports = router