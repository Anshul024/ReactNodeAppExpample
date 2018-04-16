var express = require("Express");
var app = express();

const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');
var mongo = require("mongodb");
var mongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/"
var dbo;
mongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("myDB");
    dbo.createCollection("Products", function () {
        if (err) throw err;
        console.log("Collection Created");
        //db.close();

    });
})
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(fileUpload());
app.use('/public', express.static(__dirname + "/public"));
app.get('/getProducts', function (req, res) {
    getProducts(function (result, err) {
        if (err) throw err;
        res.send(result);

    });

});

app.get('/getProductDetailById/:id', function (req, res) {
    console.log(req.params.id);
    getProductsById(req.params.id, function (result, err) {
        if (err) throw err;
        res.send(result);

    });

});

app.get('/deleteProductDetailById/:id', function (req, res) {
    console.log(req.params.id);
    deleteProductsById(req.params.id, function (result, err) {
        if (err) throw err;
        res.send(result);

    });

});
app.post('/saveProduct', function (req, res) {
    console.log(req.files);
    var image = req.files.file;
    var object = req.body;
    console.log(__dirname);
    image.mv(__dirname + '/public/' + image.name, function (data, err) {
        object.url = "http://" + req.headers.host + '/public/' + image.name;
        insertData(object, function (result, err) {
            if (err) throw err;
            res.send(result);

        });
    });

});

app.post('/updateProduct', function (req, res) {
    console.log(req.files);
    console.log(req.body);
    var object = req.body;
    if (req.files) {
        var image = req.files.file;
        image.mv(__dirname + '/public/' + image.name, function (data, err) {
            object.url = "http://" + req.headers.host + '/public/' + image.name;
            updateProductsById(object.id, object, function (result, err) {
                if (err) throw err;
                res.send(result);

            });
        });
    }
    else {
        updateProductsById(object.id, object, function (result, err) {
            if (err) throw err;
            res.send(result);

        });
    }
});

function insertData(obj, callback) {
    dbo.collection("Products").insertOne(obj, function (err, res) {
        callback(res, err);
    });
}

function getProducts(callback) {
    dbo.collection("Products").find().toArray(function (err, res) {
        callback(res, err);
    });
}
function getProductsById(id, callback) {
    var oid = new mongo.ObjectID(id);
    dbo.collection("Products").find({ '_id': oid }).toArray(function (err, res) {
        callback(res, err);
    });
}

function deleteProductsById(id, callback) {
    var oid = new mongo.ObjectID(id);
    dbo.collection("Products").deleteOne({ '_id': oid }, function (err, res) {
        callback(res, err);
    });
}
function updateProductsById(id, object, callback) {
    var oid = new mongo.ObjectID(id);
    dbo.collection("Products").updateOne({ '_id': oid }, { $set: object }, function (err, res) {
        callback(res, err);
    });
}
app.listen("8081")