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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseForRentCreatedListener = exports.Subjects = void 0;
const common_1 = require("@sima-board/common");
const constants_1 = require("../constants");
const HouseForRent_1 = require("../../models/HouseForRent");
var Subjects;
(function (Subjects) {
    Subjects["HouseForRentCreated"] = "houseforrent:created";
})(Subjects || (exports.Subjects = Subjects = {}));
class HouseForRentCreatedListener extends common_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = Subjects.HouseForRentCreated;
        this.queueGroupame = constants_1.QUEUE_GROUP_NAME;
    }
    onMessage(data, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, id, userId, version } = data;
            const houseForRent = new HouseForRent_1.HouseForRent({
                _id: id,
                title,
                userId,
                version,
            });
            yield houseForRent.save();
            msg.ack();
        });
    }
}
exports.HouseForRentCreatedListener = HouseForRentCreatedListener;
//# sourceMappingURL=HouseForRentCreatedListener.js.map