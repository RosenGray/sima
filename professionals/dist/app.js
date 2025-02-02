"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const body_parser_1 = require("body-parser");
const cookie_session_1 = __importDefault(require("cookie-session"));
const common_1 = require("@sima-board/common");
const HouseForRent_1 = require("./models/HouseForRent");
exports.app = (0, express_1.default)();
exports.app.set("trust proxy", true);
exports.app.use((0, body_parser_1.json)());
exports.app.use((0, cookie_session_1.default)({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
}));
exports.app.get("/api/professionals/healthcheck", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const house = new HouseForRent_1.HouseForRent({
        title: "Beach House",
        userId: "123",
        version: 1
    });
    yield house.save();
    res.status(200).send({ health: true });
}));
exports.app.use(common_1.currentUser);
exports.app.get("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new common_1.NotFoundError(`Route ${req.method} ${req.url} not found`);
}));
exports.app.use(common_1.errorHandler);
//# sourceMappingURL=app.js.map