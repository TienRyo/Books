var express = require('express');
var routes = function (connection) {
    var bookRouter = express.Router();
    bookRouter.route('/book/')
        .post(function (req, res) {
            connection.query('insert into books set ?',req.body, function (err, books) {
                if(err) throw err;
                res.send(books);
            });
        })
        .get(function (req, res) {
            connection.query('select * from books', function (err, books) {
                if(err) throw err;
                res.json(books);
            });
        });
    bookRouter.route('/book/:id')
        .get(function (req, res) {
            connection.query('select * from books where id='+req.params.id, function (err, books) {
                if(err) throw err;
                res.json(books);
            });
        })
        .put(function (req, res) {
            connection.query('update books set ? where id='+req.params.id,req.body, function (err, books) {
                if(err) throw err;
                res.json(books);
            });
        })
        .delete(function (req, res) {
            connection.query('delete from books where id='+req.params.id, function (err, books) {
                if(err) throw err;
                res.send(' delete id : '+req.params.id);
                res.json(books);
            })
        });
    return bookRouter;
};
module.exports = routes;