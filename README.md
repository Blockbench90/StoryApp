# StoryApp

-- concurrently не хочет работать с yarn, так что на будущее, делать нужно только через npm
"scripts": {
"start": "node dist/server.js",
"dev": "ts-node server.ts",
"nodemon": "nodemon",
"client": "npm run start --prefix client",
"star": "concurrently \"yarn nodemon\" \"yarn client\""
}

-- при добавлении typesctipt в проект, возможно перестанет запускаться yarn start, 
    пофиксить это можно, лишь удалить файл typeconfig
