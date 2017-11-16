// Include Express lib.
const app = require('express')();
const bodyParser = require('body-parser');


// Array Data 
var arrayData = [{
    "id" :1,
    "name":"test1"
},{
    "id" :2,
    "name":"test2"
},{
    "id" :3,    
    "name":"test3"
},{
    "id" :4,    
    "name":"test4"
},{
    "id" :5,    
    "name":"test5"
}
];


// get API for retrive data
app.get('/getdata', function (request, response) {
    response.send(arrayData); 
})

// POST API for insert data in Array

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/adddata', function (request, response) {

    let name = request.body.name;
    if(name != ''){
        
        let lastElementID = arrayData[arrayData.length-1].id;
        if(lastElementID > 0){
            let nextElementID = lastElementID+parseInt(1);
            let data ={"id":nextElementID ,"name": name };
            arrayData.push(data);
            response.send(arrayData);
        }
    } else {
        let dataErr = {"code":"0","status":"error","message":"please enter all fields"};
        response.send(dataErr);
    }
})

// PUT/Update API
app.use(bodyParser.urlencoded({ extended: false }));

    app.put('/updtdata', function (request, response) {
    
        let id = request.body.id;
        let name = request.body.name;
        let data="";
        if(name != null && id != null){
                arrayData.forEach(function(res,i) {        
                    if (res.id == id) {
                        res.name = name;
                    }
                });
                response.send(arrayData);

        } else {
            let dataErr = {"code":"0","status":"error","message":"please enter all fields"};
            response.send(dataErr);
        }
        
})

// Delete API



app.listen(3000, () => console.log('Example app listening on port 3000!'))
