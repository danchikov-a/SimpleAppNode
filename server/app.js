const express = require("express");

const app = express();
const cors = require('cors')
const database = require("./database/database");
const Shawarma = require("./models/shawarma");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const cookieParser = require('cookie-parser');
const User = require("./models/user");
const {resolve} = require("@babel/core/lib/vendor/import-meta-resolve");
const jwtKey = "my_secret_key"

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// Set up cookie parser middleware
app.use(cookieParser());
//app.use(requireAuth);
app.use(express.static(__dirname + "/public"));

function requireAuth(req, res, next) {
    const token = req.query.token;
    console.log('token', token);

    if (!token) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const decodedToken = jwt.verify(token, jwtKey);
        console.log('decodedToken', decodedToken);
        req.email = decodedToken.email;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

app.get("/api/shawarmas",requireAuth, function (request, response) {
    console.log('fetchShawarmas', request);
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

app.post('/api/shawarmas/register', async function (request, response) {
    // TODO: Implement user registration logic here
    console.log('user', request.body);

    let userFromRequest = request.body;

    const hashedPassword = await bcrypt.hash(userFromRequest.password, 10)

    let user = new User(userFromRequest.name, userFromRequest.email, hashedPassword);

    database.query(user.save(), function (error, result) {
        if (error) {
            return console.log(error.message)
        }
    });

    const token = jwt.sign({ email: userFromRequest.email, role: 2 }, jwtKey, {
        algorithm: "HS256",
        expiresIn: "30m",
    })

    response.json({ token })
});

app.post('/api/shawarmas/authorize', async function (request, response) {
    // TODO: Implement user registration logic here

    let userFromRequest = request.body;

    const hashedPassword = await bcrypt.hash(userFromRequest.password, 10)

    let user = new User(userFromRequest.name, userFromRequest.email, hashedPassword);

    let pass = null;
    let q = user.getUser();

    database.query(user.getUser(), function (error, result) {
        if (error) {
            return console.log(error.message)
        }

        bcrypt.compare(userFromRequest.password, result[0].password, function(err, res) {
            if (err){
                // handle error
            }
            if (res) {
                console.log('matched');

                const token = jwt.sign({ email: userFromRequest.email, role: 2 }, jwtKey, {
                    algorithm: "HS256",
                    expiresIn: "30m",
                })

                response.json({ token })
            } else {
                console.log('MISmatched');
                response.status(403);
            }
        });
    });

/*
    const hashedPassword = await bcrypt.hash(userFromRequest.password, 10)

    let user = new User(userFromRequest.name, userFromRequest.email, hashedPassword);

    database.query(user.save(), function (error, result) {
        if (error) {
            return console.log(error.message)
        }
    });

    const token = jwt.sign({ email: userFromRequest.email }, jwtKey, {
        algorithm: "HS256",
        expiresIn: "30m",
    })

    response.json({ token })*/
});

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});