"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var image_1 = require("../services/image");
var router = express_1.Router();
router.post("/image", function (req, res, next) {
    var url = req.body.url;
    var ext = req.body.ext;
    image_1.base64Encode(url, ext)
        .then(function (data) {
        res.json(data);
    })
        .catch(function (err) { return next(err); });
});
exports.default = router;
