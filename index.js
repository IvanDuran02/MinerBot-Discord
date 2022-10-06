"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_2 = require("discord.js");
const mongoose_1 = __importDefault(require("mongoose"));
const makeProfile_1 = require("./Commands/makeProfile");
const mine_1 = __importDefault(require("./Commands/mine"));
const bal_1 = __importDefault(require("./Commands/bal"));
const sell_1 = __importDefault(require("./Commands/sell"));
const inventory_1 = __importDefault(require("./Commands/inventory"));
const gay_1 = __importDefault(require("./Commands/gay"));
const profileSchema_1 = __importDefault(require("./profileSchema"));
// import { channel } from "diagnostics_channel";
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
const talkedRecently = new Set();
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    // On Start
    console.log("Bot Ready...");
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI || "", {
            keepAlive: true,
        });
        console.log("Successfully Connected to Database");
    }
    catch (err) {
        console.log(err, "Something went wrong when trying to connect to MongoDB");
    }
}));
const prefix = "!";
let timeLeft = 0;
function shuffle(array) {
    // shuffle function
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
// Embeds
const help_embed = new discord_js_2.MessageEmbed()
    .setColor("#0099ff")
    .setAuthor({
    name: "Slave Miner",
    iconURL: "https://cdn.discordapp.com/attachments/263137651199180802/935335655377084416/unknown.png",
    url: "https://discord.js.org",
})
    //  .setTitle("Slave Miner")
    .setThumbnail("https://cdn.discordapp.com/attachments/263137651199180802/935335655377084416/unknown.png")
    .addFields({ name: "!mine", value: "Use this command to start mining!" }, { name: "!sell", value: "Use this command to sell all your ore!" }, { name: "!bal", value: "Use this command to check your balance!" }, { name: "!inv", value: "Use this command to check your inventory" }, { name: "!pay", value: "Use this command to send someone money!" }, { name: "!queue", value: "Use this to queue up to play 5v5 customs!" }, { name: "!leave queue", value: "Use this to leave the queue for 5v5" }, {
    name: "!gay",
    value: "If you've been wondering if you or someone you know is gay then use to command to find out! It is correct 100% of the time. You can do !gay to check if you are gay or mention someone else to check if they are gay.",
});
// Commands
let team1 = [];
let team2 = [];
let playing_players = [];
client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, makeProfile_1.makeProfile)(message); // async function checks for user in database if none creates one
    let profileData = yield profileSchema_1.default.findOne({
        userID: message.author.id,
    });
    if (profileData.gay === "undefined") {
        let number = Math.floor(Math.random() * 9);
        console.log(number);
        if (number < 3) {
            yield profileSchema_1.default.findOneAndUpdate({ userID: message.author.id }, {
                gay: "false",
            });
        }
        else {
            yield profileSchema_1.default.findOneAndUpdate({ userID: message.author.id }, {
                gay: "true",
            });
        }
    }
    if (message.content.startsWith(prefix + "help")) {
        // !help commands shows you all commands you can use
        message.channel.send({
            embeds: [help_embed],
        });
    }
    if (message.content.startsWith(prefix + "mine")) {
        // mines ore in mining game
        if (!talkedRecently.has(message.author.id)) {
            timeLeft = 5;
            talkedRecently.add(message.author.id);
            if (message.channel.id == "817089412781178902") {
                // changes depending on channel msg is sent
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(message.author.id);
                    timeLeft = 0;
                }, 5000);
                const interval = setInterval(() => {
                    timeLeft -= 1;
                    if (timeLeft < 0) {
                        clearInterval(interval);
                    }
                }, 1000);
            }
            (0, mine_1.default)(message);
        }
        else {
            message.channel.send(`Please wait ${timeLeft} seconds before mining again`);
        }
    }
    if (message.content.startsWith(prefix + "sell")) {
        // sells ore collected while minin
        (0, sell_1.default)(message);
    }
    if (message.content.startsWith(prefix + "bal")) {
        // checks balance that you recieve from selling mined ore.
        (0, bal_1.default)(message);
    }
    if (message.content.startsWith(prefix + "leave queue")) {
        // mines ore in mining game
        playing_players.pop(message.author);
        message.channel.send({
            embeds: [
                new discord_js_2.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Popo's Team Sorter")
                    .setDescription(`${message.author} has left queue.\nPlayers in queue currently:\n\n${playing_players}`),
            ],
        });
    }
    if (message.content.startsWith(prefix + "inv")) {
        (0, inventory_1.default)(message);
    }
    if (message.content.startsWith(prefix + "queue")) {
        if (playing_players.length === 10) {
            message.channel.send({
                embeds: [
                    new discord_js_2.MessageEmbed()
                        .setColor("#0099ff")
                        .setTitle("Popo's Team Sorter")
                        .setTitle(`Queue full!`)
                        .setDescription(`\nPlayers in queue currently:\n\n${playing_players}`),
                ],
            });
            return;
        }
        if (!playing_players.includes(message.author)) {
            if (playing_players.length <= 10) {
                playing_players.push(message.author); // push players that queue into array above
                console.log("adding player");
            }
        }
        if (playing_players.length === 10) {
            console.log("10 players reached");
            shuffle(playing_players);
            team1 = [
                playing_players[0],
                playing_players[1],
                playing_players[2],
                playing_players[3],
                playing_players[4],
            ];
            team2 = [
                playing_players[5],
                playing_players[6],
                playing_players[7],
                playing_players[8],
                playing_players[9],
            ];
            message.channel.send({
                embeds: [
                    new discord_js_2.MessageEmbed()
                        .setColor("#0099ff")
                        .setTitle("Team 1")
                        .setDescription(`Top: ${team1[0]} \nJg: ${team1[1]} \nMid: ${team1[2]} \nAdc: ${team1[3]} \nSup: ${team1[4]}`),
                ],
            });
            message.channel.send({
                embeds: [
                    new discord_js_2.MessageEmbed()
                        .setColor("#0099ff")
                        .setTitle("Team 2")
                        .setDescription(`Top: ${team2[0]} \nJg: ${team2[1]} \nMid: ${team2[2]} \nAdc: ${team2[3]} \nSup: ${team2[4]}`),
                ],
            });
            playing_players = [];
            team1 = [];
            team2 = [];
            return;
        }
        message.channel.send({
            embeds: [
                new discord_js_2.MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle("Popo's Team Sorter")
                    .setDescription(`${message.author} has joined queue \nPlayers in queue currently:\n\n${playing_players}`),
            ],
            components: [],
        });
    }
    if (message.content.startsWith(prefix + "gay")) {
        (0, gay_1.default)(message);
    }
}));
client.login(process.env.TOKEN);
