const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let commandFile = files.filter(file => file.split(".").pop() === "js");

  if(commandFile.length <= 0) return console.log("Couldn't find commands.");

  commandFile.forEach((file, i) => {

    let props = require(`./commands/${file}`);

    console.log(`${file} has been loaded.`);

    bot.commands.set(props.help.name, props);

  });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is now online on ${bot.guilds.size} server(s)!`);
  bot.user.setActivity("with Countdowns!");
});

bot.on("message", async message => {

  if(message.author.bot) return;

  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;

  let commandRaw = command.split(prefix)[1];
  let commandFile = bot.commands.get(commandRaw);

  if(commandFile) commandFile.run(bot, message, args);

});

//TODO: REMEMBER TO CHANGE TO PROCESS ENV AND REMOVE TOKEN FROM CONFIG

bot.login(process.env.BOT_TOKEN);
