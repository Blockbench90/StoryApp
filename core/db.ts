import mongoose from 'mongoose';

mongoose.Promise = Promise;

//подключение к локальной базе
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/story_back', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(()=> console.log("DataBase conected"))


// подключение к удаленной базе
// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Blockbench90:zaporoziestoryexample@cluster0.yp1kp.mongodb.net/story_back?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// }).then(()=> console.log("DataBase conected"))

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export { db, mongoose };
