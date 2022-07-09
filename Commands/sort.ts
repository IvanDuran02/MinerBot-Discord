import { MessageEmbed } from "discord.js";

export async function queue(message: any, team1: any, team2: any, playing_players: any) {
  console.log("running sorting script.");

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

  if (playing_players <= 10) {
    playing_players.push(message.author); // push players that queue into array above
    console.log("10 players reached");
  }

  shuffle(playing_players);

  if (playing_players.length === 10) {
    team1 = [playing_players[0], playing_players[1], playing_players[2], playing_players[3], playing_players[4]];

    team2 = [playing_players[5], playing_players[6], playing_players[7], playing_players[8], playing_players[9]];
  }
  const teams_embed = new MessageEmbed()
    .setColor("#0099ff")

    .setTitle("Popo's Team Sorter")
    .setDescription(`${message.author} has joined queue \nPlayers in queue currently:\n${playing_players}`);
  message.channel.send({
    embeds: [teams_embed],
  });
}

console.log("script complete...");
