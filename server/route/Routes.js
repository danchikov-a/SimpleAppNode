const express = require('express');
const bodyParser = require("body-parser");
const controller = require("../controllers/controller");

const urlencodedParser = bodyParser.urlencoded({extended: true});
const router = express.Router();

router.get('/', controller.showIndex);

router.post('/create', urlencodedParser, controller.addShawarma);
router.post('/delete/:id', controller.deleteShawarma);
router.post('/update/:id/:pass', controller.updateShawarma);

module.exports = router;
