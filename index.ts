import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot Ready");
});

const prefix = "!";

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix)) {
    if (message.content.startsWith(prefix + "ping")) {
      message.reply({
        content: "pong",
      });
    }
    if (message.content.startsWith(prefix + "mine")) {
      message.reply({
        content: "You Have Acquired 4 Stone.",
      });
    }
    if (message.content.startsWith(prefix + "help")) {
      message.reply({
        content: "use *!mine* to start mining!\nuse !ping",
      });
    }
  }
});

client.login(process.env.TOKEN);
