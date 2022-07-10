const Classe = require('../models/Classe');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me//stored/classes
    storedClasses(req, res, next) {
        Promise.all([
            Classe.find({}).sortable(req), 
            Classe.countDocumentsDeleted()
        ])
            .then(([classes, deletedCount]) =>
                res.render('me/stored-classes', {
                    deletedCount,
                    classes: multipleMongooseToObject(classes),
                }),
            )
            .catch(next);
    }

     // [GET] /me/trash/classes
     trashClasses(req, res, next) {
        Classe.findDeleted({})
            .then((classes) =>
                res.render('me/trash-classes', {
                    classes: multipleMongooseToObject(classes),
                }),
            )
            .catch(next);
    }

}

module.exports = new MeController();
