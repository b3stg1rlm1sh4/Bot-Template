const Discord = require('discord.js');
const botcf = require('../JSON/botconfig.json');



const greet_cmd = {
  cmd: async function greet(bot, message, args, prefix) {
    message.delete().catch((err) => {});
    
    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    const actions = [
      "waved at", "yelled 'hi' to", "said 'yo' to"
    ]
    
    const action = await actions[Math.floor(Math.random() * actions.length)];

    let embed = new Discord.MessageEmbed()
    .setAuthor("Greeting!", message.author.avatarURL())
    .setColor(message.guild.members.resolve(message.author.id).roles.highest.hexColor)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL())
    .setDescription(`${message.author} ${action} ${target.user}`)

    message.channel.send(embed);
  },
  name: "greet",
  details: "greet target",
  group: "fun",
  example: `${botcf.prefix}greet @someone`
}



module.exports = {greet_cmd};
