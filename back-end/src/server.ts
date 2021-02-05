import express from 'express';

import { getRepository } from 'typeorm';
import './models/Orphanage'

import './database/connection';
import Orphanage from './models/Orphanage';

const app = express();

app.use(express.json());

// Rota: Insere novos orfanatos
app.post('/orphanages', async (req, res) => {
    const { 
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends  
    } = req.body;

    const orphanageRepository = getRepository(Orphanage);
    const orphanage = orphanageRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    })

    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanage);
});


app.listen(3333);

// Driver Nativo, Query builder, ORM

// Driver nativo usa de pouca abstração exigindo que o usuário use SQL para realizar requisições no BD
// Exemplo de driver nativo
// sqlite3.query('SELECT * FROM users');

// Query builder adiciona uma camada de abstração permitindo o uso de JS para controle de banco de dados
// Este JS é transformado em SQL ao ser executado. Uma biblioteca comum é o Knex.js
// Exemplo de query builder
// knex('users').select('*').where('name', 'Diego');

// ORM (Object Relational Mapping) utiliza classes para representar tabelas dentro do BD, sendo cada registro na
// tabela uma instância da classe. Alterações nos objetos refletem alterações no BD.
// Exemplo de ORM
// class User { name: String, age: Number, email: String };