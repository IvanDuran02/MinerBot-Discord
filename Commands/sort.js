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
exports.queue = void 0;
const discord_js_1 = require("discord.js");
function queue(message, team1, team2, playing_players) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("running sorting script.");
        function shuffle(array) {
            // shuffle function
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }
        if (playing_players <= 10) {
            playing_players.push(message.author); // push players that queue into array above
            console.log("10 players reached");
        }
        shuffle(playing_players);
        if (playing_players.length === 10) {
            team1 = [playing_players[0], playing_players[1], playing_players[2], playing_players[3], playing_players[4]];
            team2 = [playing_players[5], playing_players[6], playing_players[7], playing_players[8], playing_players[9]];
        }
        const teams_embed = new discord_js_1.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Popo's Team Sorter")
            .setDescription(`${message.author} has joined queue \nPlayers in queue currently:\n${playing_players}`);
        message.channel.send({
            embeds: [teams_embed],
        });
    });
}
exports.queue = queue;
console.log("script complete...");
