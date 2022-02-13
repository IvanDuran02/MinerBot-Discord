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
exports.makeProfile = void 0;
const profileSchema_1 = __importDefault(require("../profileSchema"));
const profileSchema_2 = __importDefault(require("../profileSchema"));
function makeProfile(message) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let profileData = yield profileSchema_1.default.findOne({
                userID: message.author.id,
            });
            if (!profileData) {
                console.log("profile being made");
                yield new profileSchema_2.default({
                    userID: message.author.id,
                    serverID: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id,
                    balance: 0,
                    inventory: [],
                    iron: 0,
                    bank: 0,
                }).save();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.makeProfile = makeProfile;
