const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let lUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!lUser) return message.channel.send("Cant Find user");
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.send("Nice Try");
let fwarnEmbed = new Discord.RichEmbed()
.setDescription("Language Violation")
.setColor("#e8f442")
.addField("Busted by", `${lUser} with ID ${lUser.id}`)
.addField("Busted For", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Busted in", message.channel)


let warnfChannel = message.guild.channels.find(`name`, "modlog")
if(!warnfChannel) return message.channel.send("Cant Find the ModLog")

message.channel.send("User has been noted for a language violation!");
  console.log(`${lUser} was caught by ${message.author}`);
warnfChannel.send(fwarnEmbed);
lUser.sendMessage(`You have been warned for a language violation in ${message.channel}, please remember that children play this game and should not be exposed to it`);
return;
}


module.exports.help = {
  
  name: "language"
  
}
