const path = require('path');
const database = require("../database/database");
const Shawarma = require("../models/shawarma.js");

exports.addShawarma = async function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }

    let filedata = request.file;
    const shawarma = new Shawarma(request.body.name,
        request.body.weight,
        request.body.date,
        (filedata === undefined) ? '' : filedata.filename
    );

    database.query(shawarma.save(), function (error, result) {
        if (error) return console.log(error.message)
        response.redirect("/");
    });
};

exports.deleteShawarma = async function (request, response) {
    const id = request.params.id;
    database.query(Shawarma.delete(id), function (error, result) {
        if (error) return console.log(error);
        response.redirect("/");
    });
};

exports.sendFile = async function (request, response) {
    const file = request.params.filename;
    response.download("./uploads/" + file);
};

exports.showIndex = async function (request, response) {
    database.query(Shawarma.index(), function (error, result) {
        if (error) {
            return console.log(error.message);
        }

        result.map(element => {
            const date = element.date;
            element.date = date.toLocaleDateString("ru-RU", { // you can use undefined as first argument
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
        })

        console.log(result);
        response.render(path.join(__dirname, "../pages/index.hbs"), {
            journeys: result
        });
    });
};