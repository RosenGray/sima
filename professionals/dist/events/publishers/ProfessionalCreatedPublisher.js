"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalCreatedPublisher = void 0;
const common_1 = require("@sima-board/common");
const subjects_1 = require("../subjects");
class ProfessionalCreatedPublisher extends common_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = subjects_1.Subjects.ProfessionalCreated;
    }
}
exports.ProfessionalCreatedPublisher = ProfessionalCreatedPublisher;
//# sourceMappingURL=ProfessionalCreatedPublisher.js.map