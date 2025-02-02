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
exports.HouseForRentUpdatedListener = exports.Subjects = void 0;
const common_1 = require("@sima-board/common");
const constants_1 = require("../constants");
const HouseForRent_1 = require("../../models/HouseForRent");
var Subjects;
(function (Subjects) {
    Subjects["HouseForRentUpdated"] = "houseforrent:updated";
})(Subjects || (exports.Subjects = Subjects = {}));
class HouseForRentUpdatedListener extends common_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = Subjects.HouseForRentUpdated;
        this.queueGroupame = constants_1.QUEUE_GROUP_NAME;
    }
    onMessage(data, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, version } = data;
            const houseForRent = yield HouseForRent_1.HouseForRent.findByEvent({ id, version });
            console.log(1, version);
            if (!houseForRent) {
                throw new Error("House For Rent not found");
            }
            const { title } = data;
            houseForRent.set({ title });
            console.log("houseForRent,houseForRent", houseForRent);
            yield houseForRent.save();
            console.log(houseForRent);
            msg.ack();
        });
    }
}
exports.HouseForRentUpdatedListener = HouseForRentUpdatedListener;
//# sourceMappingURL=HouseForRentUpdatedListener.js.map