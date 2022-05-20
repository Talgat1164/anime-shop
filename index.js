let mongodb = require('mongodb');
let mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/', {
    useUnifiedTopology: true
});

let express = require('express');
let path = require('path');
let app = express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));
app.set('view engine', 'ejs');

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function (req, res){
   res.render('ind');
});

app.post('/', urlencodedParser, function (req, res){
   let name = req.body.name;
   let email = req.body.email;
   let country = req.body.country;

   let data = {
       name: name,
       email: email,
       country: country,
       date: new Date()
   };
   res.render('index', {data: data});

});

app.post('/register', urlencodedParser, function (req, res){
    let name = req.body.name;
    let email = req.body.email;
    let country = req.body.country;
    let password = req.body.password;
    let date = new Date();
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Database');
            let coll = db.collection('Users');
            await coll.insertMany([{name: name, email: email, password: password, country: country, date: date}]);
        } else {
            console.error(err);
        }
    });
    res.redirect('/login');
});

app.get('/login', function (req, res){
    res.render('signin');
});
/*
app.post('/login', urlencodedParser, function (req, res){
    let email = req.body.email;
    let password = req.body.password;
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Database');
            let coll = db.collection('Users');
            let check = await coll.find({$and:[{email: email}, {password: password}]}).toArray();
            let data = {
                name: check[0].name,
                email: check[0].email,
                country: check[0].country,
                date: check[0].date
            };
            if(check.length == 0){
                res.render('error');
            }
            else{
                res.render('index', {data: data});
            }
        } else {
            console.error(err);
        }
    });
});
*/

app.post('/login', urlencodedParser, function (req, res){
    let emailInput = req.body.email;
    let passwordInput = req.body.password;
    if(emailInput == 'admin@mail.ru' && passwordInput == 'Password1!'){
        res.redirect('/admin/name');
    }
    else
    {
        let email = req.body.email;
        let password = req.body.password;
        mongoClient.connect(async function(error, mongo) {
            if (!error) {
                let db = mongo.db('Database');
                let coll = db.collection('Users');
                let check = await coll.find({$and:[{email: email}, {password: password}]}).toArray();
                let data = {
                    name: check[0].name,
                    email: check[0].email,
                    country: check[0].country,
                    date: check[0].date
                };
                if(check.length == 0){
                    res.render('error');
                }
                else{
                    res.render('index', {data: data});
                }
            } else {
                console.error(err);
            }
        });
    }
});

let ObjectID = require('mongodb').ObjectID;

app.post('/delete', urlencodedParser, function(req, res){
    let index = req.body.index;
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Database');
            let coll = db.collection('Users');
            await coll.deleteOne({"_id": ObjectID(index)});
        } else {
            console.error(err);
        }
    });
    res.redirect('/admin/name');
});

app.post('/create', urlencodedParser, function(req, res){
    let nameInput = req.body.create_name;
    let emailInput = req.body.create_email;
    let passwordInput = req.body.create_password;
    let countryInput = req.body.create_country;
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Database');
            let coll = db.collection('Users');
            await coll.insertMany([{name: nameInput, email: emailInput, password: passwordInput, country: countryInput}]);
        } else {
            console.error(err);
        }
    });
    res.redirect('/admin/name');
});

app.get('/admin/:id', function (req, res){
    if(req.params.id == 'name'){
        mongoClient.connect(async function(error, mongo){
            if(!error){
                let db = mongo.db('Database');
                let coll = db.collection('Users');
                let data = await coll.find().sort({name:1}).toArray();
                let sort = {
                    by: 'name'
                }
                res.render('admin', {data: data, sort: sort});
            } else{
                console.error(err);
            }
        });
    }
    else if(req.params.id == 'email'){
        mongoClient.connect(async function(error, mongo){
            if(!error){
                let db = mongo.db('Database');
                let coll = db.collection('Users');
                let data = await coll.find().sort({email:1}).toArray();
                let sort = {
                    by: 'email'
                }
                res.render('admin', {data: data, sort: sort});
            } else{
                console.error(err);
            }
        });
    }
    else if(req.params.id == 'password'){
        mongoClient.connect(async function(error, mongo){
            if(!error){
                let db = mongo.db('Database');
                let coll = db.collection('Users');
                let data = await coll.find().sort({password:1}).toArray();
                let sort = {
                    by: 'password'
                }
                res.render('admin', {data: data, sort: sort});
            } else{
                console.error(err);
            }
        });
    }
    else if(req.params.id == 'country'){
        mongoClient.connect(async function(error, mongo){
            if(!error){
                let db = mongo.db('Database');
                let coll = db.collection('Users');
                let data = await coll.find().sort({country:1}).toArray();
                let sort = {
                    by: 'country'
                }
                res.render('admin', {data: data, sort: sort});
            } else{
                console.error(err);
            }
        });
    }

});

app.post('/admin', urlencodedParser, function(req, res){
    let nameInput = req.body.name;
    let emailInput = req.body.email;
    let passwordInput = req.body.password;
    let countryInput = req.body.country;
    let idInput = req.body.id;
    mongoClient.connect(async function(error, mongo) {
        if (!error) {
            let db = mongo.db('Database');
            let coll = db.collection('Users');
            await coll.updateOne({"_id": ObjectID(idInput)}, {$set: {name: nameInput, email: emailInput, password: passwordInput, country: countryInput}});
            //await coll.updateOne({"_id": ObjectID(idInput)}, {$set: {email: emailInput, password: passwordInput}});
        } else {
            console.error(err);
        }
    });
    res.redirect('/admin/name');
});

app.get('/register', function (req, res){
    res.render('signup');
});

app.listen(3000, function (){
   console.log('Hello, World!');
});