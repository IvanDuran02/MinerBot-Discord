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
const discord_js_1 = require("discord.js");
const profileSchema_1 = __importDefault(require("../profileSchema"));
function Bal(message) {
    return __awaiter(this, void 0, void 0, function* () {
        let profileData = yield profileSchema_1.default.findOne({
            userID: message.author.id,
        });
        const bal_embed = new discord_js_1.MessageEmbed()
            .setColor("#50C878")
            .setTitle("Slave Miner")
            .setDescription(`You have $${profileData.balance} in your balance.`);
        message.channel.send({
            embeds: [bal_embed],
        });
    });
}
exports.default = Bal;
