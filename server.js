import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    res.json(users);
});
app.post('/api/users', (req, res) => {
    if (req.body.username) {
        const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
        const newUser = {
            username: req.body.username,
            country: req.body.country,
            id: users[users.length - 1] ? ++users[users.length - 1].id : 1
        };
        const updatedUsers = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
        updatedUsers.push(newUser);
        fs.writeFileSync('./data/users.json', JSON.stringify(updatedUsers));
        res.redirect('/');
    }
    else {
        res.status(400).json({
            status: 400,
            message: "You must provide a username in order to add a user"
        });
    }
});
app.delete('/api/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    fs.writeFileSync('./data/users.json', JSON.stringify(users.filter((user) => user.id !== Number.parseInt(req.params.id))));
    res.redirect('/');
});
app.get('/api/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    res.json(users.filter((user) => user.id === Number.parseInt(req.params.id)));
});
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
