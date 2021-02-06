# StoryApp
![Product Presentation Image](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/about.gif)

## Story - Проект задуман как альтернатива старому и скучному Проза.ру.
Поддержка и развитие является чистой инициативой автора и зависит
только от наличия свободного времени. Если кому-то, тоже надоел старый
образ мышления и политики развития молодых авторов, присоединяйтесь.
Связь сюда [prog.hak.ak@gmail.com](prog.hak.ak@gmail.com).
Толкайте идеи, предлагайте путь развития. Пока, все находится в стадии
«А что если тут будет вот так…» и т.д. Автор не является гением дизайна
и отрисовки, скорее хитрым копи-пастером. Там увидел, тут спионерил,
переделал, «и так сойдет»))
В дальнейшем, если такое случится, естественно,
все будет по первому писку моды в сфере UI, но сейчас пока так,
   сухо, сдержано и малость наивно.

Проект создан с помощью [create-react-app](https://www.npmjs.com/package/create-react-app)
(с использованием TypeScript) на основе инфраструктуры MERN.

![React](https://img.shields.io/badge/-React-00BFFF?style=for-the-badge&logo=react&logoColor=E0FFFF)
![Redux](https://img.shields.io/badge/-Redux-006400?style=for-the-badge&logo=Redux&logoColor=E0FFFF)
![Typescript](https://img.shields.io/badge/-Typescript-0000CD?style=for-the-badge&logo=typescript&logoColor=E0FFFF)
![Redux-saga](https://img.shields.io/badge/-ReduxSaga-FF4500?style=for-the-badge&logo=react&logoColor=E0FFFF)
![NodeJS](https://img.shields.io/badge/-NodeJS-006400?style=for-the-badge&logo=node.js&logoColor=E0FFFF)
![Express](https://img.shields.io/badge/-Express-006400?style=for-the-badge&logo=express&logoColor=E0FFFF)
![Mongodb](https://img.shields.io/badge/-Mongodb-006400?style=for-the-badge&logo=mongodb&logoColor=E0FFFF)

# Более детальный инструментарий можно посмотреть в package.json.
В основном, все эксперименты делаются на локальной базе, но есть подключение и к удаленной,
можно поменять конфигурацию в файле core/db.ts корня проекта.

Для хранения изображений и дальнейшего доступа к ним
выбрано [Cloudinary](https://cloudinary.com) 

![Cloudinary](https://img.shields.io/badge/-Cloudinary-00BFFF?style=for-the-badge&logo=Cloudinary&logoColor=E0FFFF)

# Для быстрого старта
- `git clone https://github.com/Blockbench90/StoryApp.git`


- `cd StoryApp`
  

- `yarn`
## Установите зависимости в части бекэнда, сразу в корне проекта и не забудьте про фронт, он находится в папке client.

- `cd client`
- `yarn`
- `cd ..` вернуться в корень
- `yarn start` из корня проекта запускает и бек и фронт

## Такс, вот что успелось сделать на данный момент:

## Если в общих чертах
![about](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/about.gif)

## Страничка регистрации и логинизации с валидацией и токеном
![Login](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/login.gif)

## Главная страничка, с просмотром отдельной истории, комментариями, лайками, репостами
![homePage](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/homePage.gif)

## Страничка пользователя
![profilePage](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/profileAbout.gif)

## Добавление истории
![addNewStory](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/addNewStory.gif)

## Добавление истории из хедера
![AddNewStoryFromHeader](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/AddNewStoryFromHeader.gif)

## Удаление своей истории, только для авторизованного пользователя
![delete](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/delete.gif)

## Редактирование своей истории, только для авторизованного пользователя
![edit](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/edit.gif)

## Смайлики в тексте
![emoji](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/emoji.gif)

## Выход
![exitPrewei](https://github.com/Blockbench90/StoryApp/blob/main/assetsMD/exitPrewei.gif)






