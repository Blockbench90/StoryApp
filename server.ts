import dotenv from 'dotenv';
//запускаем получение ключевых конфигураций
dotenv.config();

import './core/db';

import express from 'express';
import {UserCtrl} from './controllers/UserController';
import {registerValidations} from './validations/register';
import {passport} from './core/passport';
import {StoriesCtrl} from './controllers/StoriesController';
import {createStoryValidations} from './validations/createStory';
import {UploadFileCtrl} from "./controllers/UploadFileController";

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


//подключаю мультер как мидлваре для обработки загрузки файлов на cloudinary
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})


app.use(express.json());
app.use(passport.initialize());
//взять всех юзеров
app.get('/users', UserCtrl.index);
//создать юзера
app.post('/users', registerValidations, UserCtrl.create);
//верифицировать пользователя
app.get('/users/me', passport.authenticate('jwt', {session: false}), UserCtrl.getUserInfo);
//найти конкретного юзера
app.get('/users/:id', UserCtrl.show);
//добавить аватарку пользователя
app.post('/user/avatar', passport.authenticate('jwt'), UserCtrl.avatar);


//взять все истории
app.get('/stories', StoriesCtrl.index);
//найти конкретную историю
app.get('/stories/:id', StoriesCtrl.show);

//собрать истории залогиненного юзера
app.get('/profile/:id', passport.authenticate('jwt'), StoriesCtrl.getUserStories)

//пропускаю stories через мидлваре passport.authenticate('jwt'), создавая доп.интерфейс, чтобы взять ее из поля запроса(req)
//удалить историю
app.delete('/stories/:id', passport.authenticate('jwt'), StoriesCtrl.delete);
//обновить историю
app.patch('/stories/:id', passport.authenticate('jwt'), createStoryValidations, StoriesCtrl.update);
//создать в базе историю
app.post('/stories', passport.authenticate('jwt'), createStoryValidations, StoriesCtrl.create);

//зарегистрировать пользователя
app.post('/auth/register', registerValidations, UserCtrl.create);
//верефецировать пользователя
app.get('/auth/verify', registerValidations, UserCtrl.verify);
//залогиниться
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

//загрузка файлов
app.post('/upload', upload.single('image'), UploadFileCtrl.upload);

io.on('connection', (socket: any) => {
    console.log('socket connected', socket.id)
})

//слушьть порт 8888, ну или тот, который указан в конфигурации
server.listen(process.env.PORT, (error: any): void => {
    if(error){
        throw Error(error)
    }
    console.log('SERVER RUNNING!');
});
