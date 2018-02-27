var express = require('express');
var middlewareTitle = require('../middleware/middlewareTitle'),
    middlewareAuthor = require('../middleware/middlewareAuthor'),
    mysqlQuery = require('../models/mysqlModels');
var routes = function (connection) {
    var bookRouter = express.Router();
    bookRouter.route('/book')
        .post(middlewareTitle, middlewareAuthor, function (req, res) {
            connection.query(mysqlQuery.inset, req.body, function (err,book) {
                if (err)
                    res.status(500).send(err);
                res.status(201).send({message: "insert book success id:"+book.insertId});
            });
        })
        .get(function (req, res) {
            connection.query(mysqlQuery.selectAll, function (err, books) {
                if (err)
                    res.status(500).send(err);
                res.json(books);
            });
        });

    bookRouter.route('/book/:id')
        .get(function (req, res) {
            connection.query(mysqlQuery.select,req.params.id, function (err, books) {
                if (err)
                    res.status(500).send(err);
                res.json(books);
            });
        })
        .put(function (req, res) {
            connection.query(mysqlQuery.update+req.params.id, req.body, function (err) {
                if (err)
                    res.status(500).send(err);
                res.send({message: "update " + req.params.id + " success"});
            });
        })
        .delete(function (req, res) {
            connection.query(mysqlQuery.softdelete,req.params.id, function (err) {
                if(err)
                    res.status(500).send(err);
                res.send({message:' delete id : '+req.params.id});
            })
        });
    return bookRouter;
};
module.exports = routes;