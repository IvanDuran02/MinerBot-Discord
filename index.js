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
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
    // On Start
    console.log("Bot Ready...");
    yield mongoose_1.default.connect(process.env.MONGO_URI || "", {
        keepAlive: true,
    });
}));
const prefix = "!";
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
    .addFields({ name: "!mine", value: "Use this command to start mining!" }, { name: "!sell", value: "Use this command to sell all your ore!" }, { name: "!bal", value: "Use this command to check your balance!" }, { name: "!inv", value: "Use this command to check your inventory" }, { name: "!pay", value: "Use this command to send someone money!" });
// Commands
client.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.content.startsWith(prefix)) {
        yield (0, makeProfile_1.makeProfile)(message);
        // async function checks for user in database if none creates one
        if (message.content.startsWith(prefix + "help")) {
            // !help commands shows you all commands you can use
            message.channel.send({
                embeds: [help_embed],
            });
        }
        if (message.content.startsWith(prefix + "mine")) {
            // mines ore in mining game
            (0, mine_1.default)(message);
        }
        if (message.content.startsWith(prefix + "sell")) {
            // sells ore collected while minin
            (0, sell_1.default)(message);
        }
        if (message.content.startsWith(prefix + "bal")) {
            // checks balance that you recieve from selling mined ore.
            (0, bal_1.default)(message);
        }
    }
    if (message.content.startsWith(prefix + "inv")) {
        (0, inventory_1.default)(message);
    }
}));
client.login(process.env.TOKEN);
