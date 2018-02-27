exports = function title(req, res, next) {
    if(!res.body.title) {
        res.status(404).send({message: "title not null"});
        next()
    }
};
exports =function author(req, res, next) {
    if(!res.body.author) {
        res.status(404).send({message: "author not null"});
        next()
    }
};