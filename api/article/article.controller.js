/**
 * Created by zhengguorong on 16/11/4.
 */
var jsonpatch =  require('fast-json-patch')
var Article = require('./article.model')

const respondWithResult = (res, statusCode) => {
    statusCode = statusCode || 200
    return function(entity) {
        if(entity) {
            return res.status(statusCode).json(entity)
        }
        return null
    }
}

const patchUpdates = (patches) => {
    return function(entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true)
        } catch(err) {
            return Promise.reject(err)
        }

        return entity.save()
    }
}

const removeEntity = (res) => {
    return function(entity) {
        if(entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end()
                })
        }
    }
}

const handleEntityNotFound = (res) => {
    return function(entity) {
        if(!entity) {
            res.status(404).end()
            return null
        }
        return entity
    }
}

const handleError = (res, statusCode) => {
    statusCode = statusCode || 500
    return function(err) {
        res.status(statusCode).send(err)
    }
}

module.exports.index = (req,res) => {
    return Article.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res))
}
// Gets a single Article from the DB
module.exports.show = (req, res) => {
    return Article.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res))
}

// Creates a new Article in the DB
module.exports.create = (req, res) => {
    return Article.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res))
}

// Upserts the given Article in the DB at the specified ID
module.exports.update = (req, res) => {
    if(req.body._id) {
        delete req.body._id
    }
    return Article.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

        .then(respondWithResult(res))
        .catch(handleError(res))
}

// Updates an existing Article in the DB
module.exports.patch = (req, res) => {
    if(req.body._id) {
        delete req.body._id
    }
    return Article.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res))
}

// Deletes a Article from the DB
module.exports.destroy = (req, res) => {
    return Article.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res))
}
