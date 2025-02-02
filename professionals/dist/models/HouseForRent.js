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
exports.HouseForRent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_update_if_current_1 = require("mongoose-update-if-current");
const hoseForRentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    version: {
        type: Number,
        required: true,
    },
}, {
    toJSON: {
        transform: (_doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
hoseForRentSchema.statics.findByEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.HouseForRent.findOne({
        _id: event.id,
        version: event.version - 1,
    });
});
hoseForRentSchema.set("versionKey", "version");
hoseForRentSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
exports.HouseForRent = mongoose_1.default.model("sadsadsa", hoseForRentSchema);
//# sourceMappingURL=HouseForRent.js.map