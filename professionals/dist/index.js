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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const NatsWrapper_1 = require("./NatsWrapper");
const HouseForRentCreatedListener_1 = require("./events/listeners/HouseForRentCreatedListener");
const HouseForRentUpdatedListener_1 = require("./events/listeners/HouseForRentUpdatedListener");
const { NATS_CLIENT_ID, NATS_CLUSTER_ID, NATS_URL, JWT_KEY, NODE_ENV, DB_USERNAME, DB_PASSWORD, } = process.env;
const isProd = NODE_ENV === "production";
const MONGO_URI = isProd
    ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@simacluster.iwsya.mongodb.net/professionals`
    : "mongodb://professionals-mongo-srv:27017/professionals";
const professionalsServiceStart = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("starting professionals service...");
    if (!JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    if (!NATS_CLIENT_ID) {
        throw new Error("NATS_CLIENT_ID must be defined");
    }
    if (!NATS_URL) {
        throw new Error("NATS_URL must be defined");
    }
    if (!NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID must be defined");
    }
    try {
        yield NatsWrapper_1.natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);
        yield mongoose_1.default.connect(MONGO_URI);
        NatsWrapper_1.natsWrapper.client.on("close", () => {
            console.log("NATS connection closed!");
            process.exit();
        });
        process.on("SIGINT", () => NatsWrapper_1.natsWrapper.client.close());
        process.on("SIGTERM", () => NatsWrapper_1.natsWrapper.client.close());
        new HouseForRentCreatedListener_1.HouseForRentCreatedListener(NatsWrapper_1.natsWrapper.client).listen();
        new HouseForRentUpdatedListener_1.HouseForRentUpdatedListener(NatsWrapper_1.natsWrapper.client).listen();
        console.log("connecting to mongodb");
    }
    catch (error) {
        console.log("mongodb-connection error:", error);
    }
    app_1.app.listen(3000, () => {
        console.log("listening on port 3000");
    });
});
professionalsServiceStart();
//# sourceMappingURL=index.js.map