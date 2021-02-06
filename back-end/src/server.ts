import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import './models/Orphanage'
import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

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