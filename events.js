const Discord = require('discord.js');
const botcf = require('./JSON/botconfig.json');



const bot_id = "885566247041912863";



const ping4prefix_event = {
  cmd: async function ping4prefix(bot, message, prefix) {
      let embed = new Discord.MessageEmbed()
      .setAuthor(`${bot.user.username}'s Prefix!`)
      .setDescription(`prefix: \`${botcf.prefix}\`\nexample: \`${botcf.prefix}help\``)
      .setColor(data.hexColours[Math.floor(Math.random() * data.hexColours.length)])
      .setThumbnail(bot.user.avatarURL())

      message.channel.send(embed);
  },
  trigger: `<@!${bot_id}>`
}



module.exports = {ping4prefix_event};
