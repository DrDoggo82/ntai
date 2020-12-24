"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var ip_1 = __importDefault(require("ip"));
var doujins_1 = __importDefault(require("./api/doujins"));
var media_1 = __importDefault(require("./api/media"));
var error_handler_1 = __importDefault(require("./middlewares/error-handler"));
dotenv_1.default.config();
var app = express_1.default();
var port = process.env.PORT;
// middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
// api routes
app.use("/api", doujins_1.default);
app.use("/api", media_1.default);
// serve react
app.use(express_1.default.static(path_1.default.join(__dirname, "app", "build")));
app.get("/*", function (_, res) {
    res.sendFile(path_1.default.join(__dirname, "app", "build", "index.html"));
});
// error handling middleware
app.use(error_handler_1.default);
app.listen(port, function () {
    console.log("server running on " + ip_1.default.address() + ":" + port);
});
