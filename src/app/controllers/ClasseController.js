const Classe = require('../models/Classe');
const { mongooseToObject } = require('../../util/mongoose');

class ClasseController {
    // [GET] /classes/:slug
    show(req, res, next) {
        console.log('req.params', req.params);
        Classe.findOne({ slug: req.params.slug })
            .then((classe) => {
                console.log('classe', classe);
                res.render('classes/show', {
                    classe: mongooseToObject(classe),
                });
            })
            .catch(next);
    }

    // [GET] /classes/create
    create(req, res, next) {
        res.render('classes/create');
    }

    // [POST] /classes/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const classe = new Classe(req.body);
        classe
            .save()
            .then(() => res.redirect('/me/stored/classes'))
            .catch(next);
    }

     // [GET] /classes/:id/edit
     edit(req, res, next) {
        Classe.findById(req.params.id)
            .then((classe) =>
                res.render('classes/edit', {
                    classe: mongooseToObject(classe),
                }),
            )
            .catch(next);
    }

     // [PUT] /classes/:id
     update(req, res, next) {
        Classe.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/classes'))
            .catch(next);
    }
    
    // [DELETE] /classes/:id
    destroy(req, res, next) {
        Classe.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /classes/:id/force
    forceDestroy(req, res, next) {
        Classe.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /classes/:id/restore
    restore(req, res, next) {
        Classe.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /classes/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Classe.delete({ _id: { $in: req.body.classeIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default: 
                res.json({ message: 'Action is invalid!' });
        }
    }
}

module.exports = new ClasseController();
