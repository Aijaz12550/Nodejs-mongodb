const express = require('express');
const app = express();
const db = require('./config/db');
var cors = require('cors')

// /*
// PUSH NOTIFICATION_________START
// */
// var admin = require("firebase-admin");

// var serviceAccount = require("./serverKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://push-mesa.firebaseio.com"
// });

// var token =[
//     'eLsouC5p9zA:APA91bEhRa6yyWWIlrt_tfi0gra3iI2QBum7bfAF0GNBEiJuHJA3kOI1n8AP4DYNU66gGX9T1-ynplLdWoVapmufMeVqu-pzFfi1P8uRzLg2VmJv2qkaWOqYE6LfLo1AnrSKCg3d54kz',
//     'eco0UoUIa7s:APA91bEJtJi861T_aehbbJKcnoni4QQHAnRqiaiPqcg6IFU3iM63cvH2TekBpADALLi3yOf3eVO-WmNE9yocOwv1nrDk9l9GY2qHhJVbgde1HAd1H1RdymcNvOiavdNkktEu3gz-OpO8',
// ]

// var payload ={
//     notification :{
//         title:'Hello',
//         body:'This is my notification',
//         }
// }

// var options = {
//     priority : 'high',
//     timeToLive : 60 * 60 * 24,
//     vibration:true,
//     sound:true,
// }

// admin.messaging().sendToDevice(token, payload , options)
// .then(responce => console.log('notification sent'.responce))
// .catch(err => console.log('error----->>',err))

// /*
// PUSH NOTIFICATION_________END
// */

app.use(cors())

db.connection.once('open', () => {
    console.log('db connected');
})
.on("error", error => {
    console.log("Error ->", error)
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.listen(process.env.PORT || 3000, function() {
    console.log('server is listening')
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/test',(req,res)=> res.send({message: "Working..."}))
app.use('/', require('./routes/index.js'))

// app.get('/test', (req, res) => {
//     res.send({message: "Worked"})
// })

// app.get('/getAllFriends', (req, res) => {
//     console.log('hello world')
//     res.send({users: [], message: 'successful'})
// })

// app.post('/addFriend', (req, res) => {
//     console.log('hello world')
//     res.send({message: 'friend added'})
// })