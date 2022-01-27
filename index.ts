import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import { MessageEmbed } from "discord.js";
import mongoose from "mongoose";
import { makeProfile } from "./Commands/makeProfile";
import Mine from "./Commands/mine";
import Bal from "./Commands/bal";
import Sell from "./Commands/sell";

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  // On Start
  console.log("Bot Ready...");
  await mongoose.connect(process.env.MONGO_URI || "", {
    keepAlive: true,
  });
});

const prefix = "!";

// Embeds

const help_embed = new MessageEmbed()
  .setColor("#0099ff")
  .setAuthor({
    name: "Slave Miner",
    iconURL: "https://cdn.discordapp.com/attachments/263137651199180802/935335655377084416/unknown.png",
    url: "https://discord.js.org",
  })
  //  .setTitle("Slave Miner")
  .setThumbnail("https://cdn.discordapp.com/attachments/263137651199180802/935335655377084416/unknown.png")
  .addFields(
    { name: "!mine", value: "Use this command to start mining!" },
    { name: "!sell", value: "Use this command to sell all your ore!" },
    { name: "!bal", value: "Use this command to check your balance!" },
    { name: "!pay", value: "Use this command to send someone money!" }
  );

// Commands

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix)) {
    makeProfile(message);

    // async function checks for user in database if none creates one
    if (message.content.startsWith(prefix + "help")) {
      // !help commands shows you all commands you can use
      message.channel.send({
        embeds: [help_embed],
      });
    }
    if (message.content.startsWith(prefix + "mine")) {
      // mines ore in mining game
      Mine(message);
    }
    if (message.content.startsWith(prefix + "sell")) {
      // sells ore collected while minin
      Sell(message);
    }
    if (message.content.startsWith(prefix + "bal")) {
      // checks balance that you recieve from selling mined ore.
      Bal(message);
    }
  }
  if (message.content.startsWith(prefix + "inventory")) {
    // !help commands shows you all commands you can use
    message.channel.send({
      embeds: [help_embed],
    });
    console.log(message.author.id);
  }
});

client.login(process.env.TOKEN);
