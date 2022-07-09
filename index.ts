import DiscordJS, { Guild, Intents } from "discord.js";
import dotenv from "dotenv";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import mongoose from "mongoose";
import { makeProfile } from "./Commands/makeProfile";
import Mine from "./Commands/mine";
import Bal from "./Commands/bal";
import Sell from "./Commands/sell";
import Inventory from "./Commands/inventory";
import Gay from "./Commands/gay";
import profileModels from "./profileSchema";
import { channel } from "diagnostics_channel";
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const talkedRecently = new Set();

client.on("ready", async () => {
  // On Start
  console.log("Bot Ready...");
  await mongoose.connect(process.env.MONGO_URI || "", {
    keepAlive: true,
  });
});

const prefix = "!";

function shuffle(array: number[]) {
  // shuffle function
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

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
    { name: "!inv", value: "Use this command to check your inventory" },
    { name: "!pay", value: "Use this command to send someone money!" },
    { name: "!queue", value: "Use this to queue up to play 5v5 customs!" },
    { name: "!leave queue", value: "Use this to leave the queue for 5v5" },
    {
      name: "!gay",
      value:
        "If you've been wondering if you or someone you know is gay then use to command to find out! It is correct 100% of the time. You can do !gay to check if you are gay or mention someone else to check if they are gay.",
    }
  );

// Commands

let team1: any = [];
let team2: any = [];
let playing_players: any = [];

client.on("messageCreate", async (message) => {
  await makeProfile(message); // async function checks for user in database if none creates one
  let profileData = await profileModels.findOne({
    userID: message.author.id,
  });
  if (profileData.gay === "undefined") {
    let number = Math.floor(Math.random() * 9);
    console.log(number);
    if (number < 3) {
      await profileModels.findOneAndUpdate(
        { userID: message.author.id },
        {
          gay: "false",
        }
      );
    } else {
      await profileModels.findOneAndUpdate(
        { userID: message.author.id },
        {
          gay: "true",
        }
      );
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
    if (talkedRecently.has(message.author.id)) {
      message.channel.send("Please wait before mining again");
    } else {
      talkedRecently.add(message.author.id);
      if (message.channel.id == "817089412781178902") {
        // changes depending on channel msg is sent
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
      } else {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }
      Mine(message);
    }
  }
  if (message.content.startsWith(prefix + "sell")) {
    // sells ore collected while minin
    Sell(message);
  }
  if (message.content.startsWith(prefix + "bal")) {
    // checks balance that you recieve from selling mined ore.
    Bal(message);
  }
  if (message.content.startsWith(prefix + "leave queue")) {
    // mines ore in mining game
    playing_players.pop(message.author);
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Popo's Team Sorter")
          .setDescription(`${message.author} has left queue.\nPlayers in queue currently:\n\n${playing_players}`),
      ],
    });
  }
  if (message.content.startsWith(prefix + "inv")) {
    Inventory(message);
  }
  if (message.content.startsWith(prefix + "queue")) {
    if (playing_players.length === 10) {
      message.channel.send({
        embeds: [
          new MessageEmbed()
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

      team1 = [playing_players[0], playing_players[1], playing_players[2], playing_players[3], playing_players[4]];

      team2 = [playing_players[5], playing_players[6], playing_players[7], playing_players[8], playing_players[9]];
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Team 1")
            .setDescription(
              `Top: ${team1[0]} \nJg: ${team1[1]} \nMid: ${team1[2]} \nAdc: ${team1[3]} \nSup: ${team1[4]}`
            ),
        ],
      });
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Team 2")
            .setDescription(
              `Top: ${team2[0]} \nJg: ${team2[1]} \nMid: ${team2[2]} \nAdc: ${team2[3]} \nSup: ${team2[4]}`
            ),
        ],
      });
      playing_players = [];
      team1 = [];
      team2 = [];
      return;
    }
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Popo's Team Sorter")
          .setDescription(`${message.author} has joined queue \nPlayers in queue currently:\n\n${playing_players}`),
      ],
      components: [],
    });
  }

  if (message.content.startsWith(prefix + "gay")) {
    Gay(message);
  }
});

client.on("clickButton", async (button) => {
  if (button.id === "primary") {
    console.log("clicked");
  }
});

client.login(process.env.TOKEN);
