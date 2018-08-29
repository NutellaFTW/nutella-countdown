const Discord = require("discord.js");
const config = require("../config.json")

const voiceID = "484243868225896461";

const ids = [
  "484200585055305758",
  "484200607402688512",
  "484200663497048096",
  "484200669184655360"
];

var countdownRunning = false;

async function clear(message) {
      message.delete();
      const fetched = await message.channel.fetchMessages({limit: 2});
      message.channel.bulkDelete(fetched);
}

module.exports.run = async (bot, message, args) => {

  if(message.channel.id != config.countdown_channel_id) return;

    if(countdownRunning) return;

      countdownRunning = true;

      var countdown = 10;

      var interval = setInterval(() => {

        clear(message);

        if(countdown <= 0) {
          clear(message);
          message.channel.send(`Queue Up! <@&${ids[0]}> <@&${ids[1]}> <@&${ids[2]}> <@&${ids[3]}>`).catch(console.error);
          countdownRunning = false;
          clearInterval(interval);
        } else {
          message.channel.send(`Queue Up In ${countdown} SECONDS! <@&${ids[0]}> <@&${ids[1]}> <@&${ids[2]}> <@&${ids[3]}>`).catch(console.error);
          countdown--;
        }

      }, 1500);

}

module.exports.help = {
  name: "startcountdown"
}
