const Discord = require('discord.js');
const botcf = require('../JSON/botconfig.json');
const commands = Object.values(require('../commands.js'));



const help_cmd = {
  cmd: async function help(bot, message, args, prefix) {
    message.delete().catch((err) => {
      // do nothing
    })

    let embed = new Discord.MessageEmbed();
    embed.setAuthor("Command Support", bot.user.avatarURL())
    embed.setColor(message.guild.members.resolve(message.author.id).roles.highest.hexColor)
    embed.setTimestamp()
    embed.setFooter("Test commands are unlisted here", message.guild.iconURL())

    let _ = "";
    if(args.length == 0) {
      _ = `
      • fun
      `
      embed.setDescription(_);
    }else if(args[0].toLowerCase() == "fun") {
      commands[0].forEach(function(command) {
        _ += `
        ${command.name} ~ ${command.details}
        example ~ \`${command.example}\`
        group ~ ${command.group}\n
        `
      })
    }

    embed.setDescription(_);

    if(embed.description) message.channel.send(embed);
    else message.reply(`that category doesn't exist!`);
  },
  name: "help",
  details: "provides command support",
  group: "support",
  example: `${botcf.prefix}help`
}



module.exports = {help_cmd};
