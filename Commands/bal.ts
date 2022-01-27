import { MessageEmbed } from "discord.js";
import profileModels from "../profileSchema";

export default async function Bal(message: any) {
  let profileData = await profileModels.findOne({
    userID: message.author.id,
  });
  if (!profileData) return message.channel.send("!help\nSince you're a new user take a look at these commands first!");
  const bal_embed = new MessageEmbed()
    .setColor("#50C878")
    .setTitle("Slave Miner")
    .setDescription(`You have $${profileData.balance} in your balance.`);
  message.channel.send({
    embeds: [bal_embed],
  });
}
