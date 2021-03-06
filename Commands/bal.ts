import { MessageEmbed } from "discord.js";
import profileModels from "../profileSchema";

export default async function Bal(message: any) {
  let profileData = await profileModels.findOne({
    userID: message.author.id,
  });
  const bal_embed = new MessageEmbed()
    .setColor("#50C878")
    .setTitle("Slave Miner")
    .setDescription(`You have $${profileData.balance} in your balance.`);
  message.channel.send({
    embeds: [bal_embed],
  });
}
