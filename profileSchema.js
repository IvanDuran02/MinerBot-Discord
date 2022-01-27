"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    userID: {
        type: Number,
        required: true,
        unique: true,
    },
    serverID: {
        type: String,
        require: true,
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
    inventory: {
        type: Array,
        required: true,
    },
    bank: {
        type: Number,
    },
    iron: {
        type: Number,
    },
});
exports.default = mongoose_1.default.model("ProfileModels", profileSchema);
