import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import {handleValidationErrors, checkAuth, parseRSS} from './utils';
import {UserController, PostController} from './controllers';
import {registerValidation} from './validations.js';

mongoose.connect(
    'mongodb+srv://marjanmarychak:z5E8K40KMRaUzX1D@parserrss.sfxvobv.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

parseRSS();

app.use(express.json());
app.use(cors());

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/user', checkAuth, UserController.getUser);

app.post('/posts', checkAuth, PostController.create);
app.get('/posts', checkAuth, PostController.getAll);
app.get('/posts/:id', checkAuth, PostController.getPost);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.put(
    '/posts/:id',
    checkAuth,
    PostController.update,
);

app.listen(3001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});