"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const config_1 = require("./config");
const server = index_1.default.listen(config_1.config.port, () => {
    console.log(`Server running on port ${config_1.config.port} in ${config_1.config.nodeEnv} mode`);
});
exports.default = server;
//# sourceMappingURL=server.js.map