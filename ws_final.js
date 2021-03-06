// Include Express lib.
const app = require('express')();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.use(bodyParser.urlencoded({ extended: false }));

//database connection, will check everytime the connection is true or not
const sequelize = new Sequelize('nodedb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });

// Fetch All Users API
app.get('/ws_fetchAllUsers', function (request, response) {
    User.findAll().then(user => {
        response.send(user);
      });
     
});
// Fetch Single User API
app.post('/ws_fetchSingleUser', function (request, response) {
    let id = request.body.id;
    if(id){
        User.findOne({where: {
            id:id
        }})
        .then(user => {    
            if(user){
                let users = {"code":"1","status":"success","data":user,"message":"Records found Successfully"};
                response.send(users);
            }
            else{
                let dataErr = {"code":"0","status":"error","message":"No Records Found"};
                response.send(dataErr);
            }
        })
        .catch(err => {
        });
    }
    else{
        let dataErr = {"code":"0","status":"error","message":"please enter all fields"};
        response.send(dataErr);
    }
});
//Insert User API
app.post('/ws_insertSingleUser', function (request, response) {
    let id = request.body.id;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    if(firstName && lastName){
        User.create({
            firstName: firstName,
            lastName: lastName
          });
          let users = {"code":"1","status":"success","message":"Records inserted Successfully"};
          response.send(users);
    }
    else{
        let dataErr = {"code":"0","status":"error","message":"please enter all fields"};
        response.send(dataErr);
    }
});
//Update Single User API
app.post('/ws_updateSingleUser', function (request, response) {
    let id = request.body.id;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    if(firstName && lastName){
        User.update({
            firstName: firstName,
            lastName: lastName
          },{
            where: {
              id: id
            }
          }).then(user => {    
            if(user){
                let users = {"code":"1","status":"success","message":"Records updated Successfully"};
                response.send(users);
            }
            else{
                let dataSucc = {"code":"0","status":"error","message":"No Records Found"};
                response.send(dataSucc);
            }
        })
        .catch(err => {
        });
    }
    else{
        let dataErr = {"code":"0","status":"error","message":"please enter all fields"};
        response.send(dataErr);
    }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
