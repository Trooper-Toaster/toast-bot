const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 let bUser = message.user(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!bUser) return message.channel.send("Cant Find user");
let breason = args.join(" ").slice(22);
if(!message.member.hasPermission("BAN_MEMBERS")) return message.send("Nice Try")
if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Can't ban other Mods")

let banembed = new Discord.RichEmbed()
.setDescription("Ban")
.setColor("#e09d0e")
.addField("Banned User", `${bUser} with ID ${bUser.id}`)
.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Banned in", message.channel)
.addField("Reason", breason);

let kickChannel = message.guild.channels.find(`name`, "modlog")
if(!kickChannel) return message.channel.send("Cant Find the ModLog")

message.guild.member(bUser).ban(breason);
kickChannel.send(banembed);
bUser.sendMessage(`You have been warned for ${breason}`);



  return;
}


module.exports.help = {
  
  name: "ban"
  
}
