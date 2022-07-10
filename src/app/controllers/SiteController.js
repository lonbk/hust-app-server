const Classe = require('../models/Classe');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Classe.find({})
            .then((classes) => {
                res.render('home', {
                    classes: multipleMongooseToObject(classes),
                });
                console.log('classes', classes);
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
