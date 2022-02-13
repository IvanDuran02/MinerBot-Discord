import { MessageEmbed } from "discord.js";
import profileModels from "../profileSchema";

export default async function Inventory(message: any) {
  let profileData = await profileModels.findOne({
    userID: message.author.id,
  });
  const inventory_embed = new MessageEmbed()
    .setColor("#0099ff")

    .setTitle("Slave Miner")
    .setDescription(`You have ${profileData.iron} Iron in your inventory.`);
  message.channel.send({
    embeds: [inventory_embed],
  });
}
