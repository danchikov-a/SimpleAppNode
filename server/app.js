const express = require("express");

const app = express();
const cors = require('cors')
const database = require("./database/database");
const Shawarma = require("./models/shawarma");
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.get("/api/shawarmas", function (request, response) {
    database.query(Shawarma.index(), function (error, result) {
        if (error) {
            return console.log(error.message);
        }

        response.send(result);
    });
});

app.post("/api/shawarmas/create", function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    let shawarmaFromRequest = request.body.shawarma;
    console.log('shawarmaFromRequest', shawarmaFromRequest)
    let shawarma = new Shawarma(shawarmaFromRequest.name,
        shawarmaFromRequest.weight, shawarmaFromRequest.filename, shawarmaFromRequest.price);

    database.query(shawarma.save(), function (error, result) {
        if (error) {
            return console.log(error.message)
        }

        response.send(result);
    });
});

app.post("/api/shawarmas/delete", function (request, response) {
    console.log('delete body', request.body)

    database.query(Shawarma.delete(request.body.shawarmaId), function (error, result) {
        if (error) {
            return console.log(error.message)
        }

        response.send(result);
    });
});

app.post("/api/shawarmas/update", function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    let shawarmaFromRequest = request.body.shawarma;

    let shawarma = new Shawarma(shawarmaFromRequest.name,
        shawarmaFromRequest.weight, shawarmaFromRequest.filename, shawarmaFromRequest.price);

    database.query(shawarma.update(shawarmaFromRequest.id), function (error, result) {
        if (error) {
            return console.log(error.message)
        }

        response.send(result);
    });
});

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});