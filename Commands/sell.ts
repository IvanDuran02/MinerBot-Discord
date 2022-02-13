import { MessageEmbed } from "discord.js";
import profileModels from "../profileSchema";

export default async function Sell(message: any) {
  let profileData = await profileModels.findOne({
    userID: message.author.id,
  });
  let sell = (await profileData.iron) * 25;
  const response = await profileModels.findOneAndUpdate(
    { userID: message.author.id },
    {
      $inc: {
        balance: sell,
      },
    }
  );
  const sell_embed = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Slave Miner")
    .setDescription(`You have Sold ${profileData.iron} Iron.`);
  message.channel.send({
    embeds: [sell_embed],
  });
  await profileModels.findOneAndUpdate({ userID: message.author.id }, { iron: 0 });
}
