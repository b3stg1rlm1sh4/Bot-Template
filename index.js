// importing node modules
const Discord = require('discord.js');

const keepAlive = require('./server');

const commands = Object.values(require("./commands"));

const support = Object.values(require("./groups/support"));

const events = Object.values(require("./events"));
  


// importing cfg and db
let botcf = require('./JSON/botconfig.json');



// instantiating classes and declarations
const bot = new Discord.Client({
    disableEveryone: true
});

bot.commands = new Map();



// runs on bot start-up
bot.on('ready', async () => {
    // displays bot is online and ready to use
    console.log(`${bot.user.username} is online!`);
    
    // applies rich presence
    bot.user.setActivity(`ping4prefix`, {
        type: 'PLAYING'
    });
});



// runs when bot receives new Discord.Message
bot.on('message', async message => {
    let cmdRun = false;
    let eventRun = false;

     // bot will ignore other bots
    if (message.author.bot) return;

    let prefix = botcf.prefix;
    
    // ignores non-cmd messages and runs events
    if(!message.content.toLowerCase().startsWith(prefix)) {
      events.forEach(function(event) {
        if(message.content == event.trigger) {
          event.cmd(bot, message, prefix);
          eventRun = true;
        };
      })
    };
    
    // creates array of each word/args in message
    let messageArrary = message.content.split(' ');
    
    // identifies cmd trigger from it's arguments
    let cmdArray = messageArrary[0].split(`${prefix}`); 
    
    // stores name of command being used
    let cmdName = cmdArray.slice(1).toString();
    
    // separates the words after the command as the arguments for the command
    let args = messageArrary.slice(1);

    if(!eventRun) {
      if(!message.content.toLowerCase().startsWith(prefix)) return;
      if(cmdName != "help") {
        commands.forEach(function(group) {
          group.forEach(function(command) {
            if(cmdName == command.name) {
              command.cmd(bot, message, args, prefix);
              cmdRun = true;
            }
          })
        })
        if(!cmdRun) message.reply(`${cmdName} is not a command!`);
      }else {
        support[0].cmd(bot, message, args, prefix);
      }
    }
});



// signs bot in
keepAlive();
bot.login(process.env['TOKEN']);
