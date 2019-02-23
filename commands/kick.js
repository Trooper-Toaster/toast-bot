const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./kicks.json", "utf8"));

module.exports.run = async (bot, message, args) => {
let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return message.channel.send("Cant Find user");
let kreason = args.join(" ").slice(22);
if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nope")
if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Cant Kick other Mods")
if(!warns[kUser.id]) warns[kUser.id] = {
    warns: 0
  };

  warns[kUser.id].warns++;
   fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });
let kickEmbed = new Discord.RichEmbed()
.setDescription("Kick")
.setColor("#e09d0e")
.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Kicked in", message.channel)
.addField("Reason", kreason);

let kickChannel = message.guild.channels.find(`name`, "modlog");
if(!kickChannel) return message.channel.send("Cant Find the ModLog");

message.guild.member(kUser).kick(kreason);
kickChannel.send(kickEmbed);
  console.log(`${kUser} was kicked by ${message.author}`)
kUser.sendMessage(`You have been kicked for ${kreason}`);

    if(warns[kUser.id].warns == 3){
    message.guild.member(kUser).ban(kreason);
    message.reply(`<@${kUser.id}> has been banned.`);
    warns[kUser.id] = {
    warns: 0
  };
  }

  return;
}


module.exports.help = {
  
  name: "kick"
  
