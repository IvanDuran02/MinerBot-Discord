import { MessageEmbed } from "discord.js";
import profileModels from "../profileSchema";

export default async function Gay(message: any) {
  let profileData = await profileModels.findOne({
    userID: message.author.id,
  });

  if (message.mentions.members.size) {
    console.log("checking mentioned person");
    let mentionedData = await profileModels.findOne({
      userID: message.mentions.users.first(),
    });

    if (!mentionedData) {
      message.channel.send({
        embeds: [new MessageEmbed().setColor("#0099ff").setTitle("User has not check if they are gay or not.")],
      });
    }

    if (mentionedData.gay === "true") {
      message.channel.send({
        embeds: [new MessageEmbed().setColor("#0099ff").setTitle(`${message.mentions.users.first().username} is gay`)],
      });
    } else if (mentionedData.gay === "false") {
      message.channel.send({
        embeds: [
          new MessageEmbed().setColor("#0099ff").setTitle(`${message.mentions.users.first().username} is not gay`),
        ],
      });
    }
    return;
  }
  if (profileData.gay === "true") {
    message.channel.send({
      embeds: [new MessageEmbed().setColor("#0099ff").setTitle("You are gay")],
    });
  } else if (profileData.gay === "false") {
    message.channel.send({
      embeds: [new MessageEmbed().setColor("#0099ff").setTitle("You are not gay")],
    });
  }
}
