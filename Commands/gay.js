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
function Gay(message) {
    return __awaiter(this, void 0, void 0, function* () {
        let profileData = yield profileSchema_1.default.findOne({
            userID: message.author.id,
        });
        if (message.mentions.members.size) {
            console.log("checking mentioned person");
            let mentionedData = yield profileSchema_1.default.findOne({
                userID: message.mentions.users.first(),
            });
            if (!mentionedData) {
                message.channel.send({
                    embeds: [new discord_js_1.MessageEmbed().setColor("#0099ff").setTitle("User has not check if they are gay or not.")],
                });
            }
            if (mentionedData.gay === "true") {
                message.channel.send({
                    embeds: [new discord_js_1.MessageEmbed().setColor("#0099ff").setTitle(`${message.mentions.users.first().username} is gay`)],
                });
            }
            else if (mentionedData.gay === "false") {
                message.channel.send({
                    embeds: [
                        new discord_js_1.MessageEmbed().setColor("#0099ff").setTitle(`${message.mentions.users.first().username} is not gay`),
                    ],
                });
            }
            return;
        }
        if (profileData.gay === "true") {
            message.channel.send({
                embeds: [new discord_js_1.MessageEmbed().setColor("#0099ff").setTitle("You are gay")],
            });
        }
        else if (profileData.gay === "false") {
            message.channel.send({
                embeds: [new discord_js_1.MessageEmbed().setColor("#0099ff").setTitle("You are not gay")],
            });
        }
    });
}
exports.default = Gay;
