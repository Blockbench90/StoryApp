import express from 'express';
import jwt from 'jsonwebtoken';

import { validationResult } from 'express-validator';
import { UserModel, UserModelInterface, UserModelDocumentInterface } from '../models/UserModel';
import { generateMD5 } from '../utils/generateHash';
import { sendEmail } from '../utils/sendEmail';
import { isValidObjectId } from '../utils/isValidObjectId';

class UserController {
  //получить всех пользователей
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();

      res.json({
        status: 'success',
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }
  //найти пользователя по ID
  async show(req: any, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findById(userId).exec();

      if (!user) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }
  //создать пользователя
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      //проверка валидации, при наличии ошибки, сообщить на фронт
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }
      //если все гуд, создать пользователя, исходя из интерфейса
      const data: UserModelInterface = {
        email: req.body.email,
        username: req.body.username,
        fullname: req.body.fullname,
        //хеш пароля можно найти в слитых базах, поэтому добавляем сгенерированный ключ в конец
        //и амба, не огонь, но маленькая хитрость
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        //генерируется хеш, добавляя рандомную строку
        confirmHash: generateMD5(process.env.SECRET_KEY + Math.random().toString()),
      };

      const user = await UserModel.create(data)

      sendEmail(
        {
          emailFrom: 'admin@story.com',
          emailTo: data.email,
          subject: 'Подтверждение почты социальной сети Story',
          html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${ process.env.PORT || 8888 }/auth/verify?hash=${data.confirmHash}">по этой ссылке</a>`,
        },
        (err: Error | null) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err,
            });
          } else {
            res.status(201).json({
              status: 'success',
              data: user,
            });
          }
        },
      );
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  //добавить аватарку
  async avatar(req: express.Request, res: express.Response): Promise<void> {
    try {

      const image = req.body
      const user = req.user as UserModelInterface;

      const data = await UserModel.findOneAndUpdate(
          {_id: user._id},
          {$addToSet: {profileAvatar: image[0]}},
          function (error, success) {
            if (error) {
              console.log('Error with update profileAvatar', error);
            } else {
              console.log('Success with update profileAvatar', success);
            }
          }
      ).exec()

      res.json({
        status: 'success',
        data: data
      });

    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async verify(req: any, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;

      if (!hash) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findOne({ confirmHash: hash }).exec();

      if (user) {
        user.confirmed = true;
        await user.save();

        res.json({
          status: 'success',
          data: user.toJSON(),
        });
      } else {
        res.status(404).json({ status: 'error', message: 'Пользователь не найден' });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  //после логинизации передаем все на фронт
  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      //небольшая проверка, с возвращаемым обьектом в json формате с типами из UserModelDocumentInterface
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
      res.json({
        status: 'success',
        data: {
          //распарсим юзера
          ...user,
          //создадим токен с валидностью в 30 дней
          token: jwt.sign({ data: req.user }, process.env.SECRET_KEY || '123', {
            expiresIn: '30 days',
          }),
        },
      });
      //а в случае ошибки, вернем статут 500, как ошибка авторизации, и саму ошубку
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
    
      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }
}

export const UserCtrl = new UserController();
