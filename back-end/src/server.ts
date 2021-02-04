import express, { response } from 'express';

const app = express();

// Rota : conjunto
// Recurso : usuários

app.get('/users', (req, res) => {
    return res.json({ message: "Hello World" });
});

app.listen(3333);