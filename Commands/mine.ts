import { MessageEmbed } from "discord.js";
import profileModels from "../profileSchema";

export default async function Mine(message: any) {
  let profileData = await profileModels.findOne({
    userID: message.author.id,
  });
  let number = Math.floor(Math.random() * 9) + 1;
  const response = await profileModels.findOneAndUpdate(
    { userID: message.author.id },
    {
      $inc: {
        iron: number,
      },
    }
  );

  const mine_embed = new MessageEmbed()
    .setColor("#0099ff")

    .setTitle("Slave Miner")
    .setDescription(`You have mined ${number} Iron.`);
  message.channel.send({
    embeds: [mine_embed],
  });
}
