"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var nhentai_1 = require("nhentai");
var router = express_1.Router();
var nhentai = new nhentai_1.API();
router.get("/doujin/:id", function (req, res, next) {
    var id = req.params.id;
    nhentai
        .fetchDoujin(id)
        .then(function (doujin) {
        res.json(doujin);
    })
        .catch(function (err) { return next(err); });
});
router.get("/doujin/random", function (req, res, next) {
    nhentai
        .randomDoujin()
        .then(function (doujin) {
        res.json(doujin);
    })
        .catch(function (err) { return next(err); });
});
router.get("/doujins/tag/:id", function (req, res, next) {
    var id = req.params.id;
    var page = req.query.page;
    nhentai
        .searchByTagID(id, page)
        .then(function (results) {
        res.json(results);
    })
        .catch(function (err) { return next(err); });
});
router.get("/doujins/related/:id", function (req, res, next) {
    var id = req.params.id;
    var page = req.query.page;
    nhentai
        .searchRelated(id, page)
        .then(function (results) {
        res.json(results);
    })
        .catch(function (err) { return next(err); });
});
router.get("/doujins/search", function (req, res, next) {
    var keyword = (req.query.keyword || "*");
    var page = req.query.page;
    nhentai
        .search(keyword, page, sort(req.query.sort))
        .then(function (results) {
        res.json(results);
    })
        .catch(function (err) { return next(err); });
});
function sort(key) {
    if (key === "today")
        return nhentai_1.SortMethods.POPULAR_TODAY;
    if (key === "week")
        return nhentai_1.SortMethods.POPULAR_THIS_WEEK;
    if (key === "recent")
        return nhentai_1.SortMethods.RECENT;
    return nhentai_1.SortMethods.POPULAR_ALL_TIME;
}
exports.default = router;
