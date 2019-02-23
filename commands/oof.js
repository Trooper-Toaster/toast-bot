const Discord = require("discord.js")
const rbx = require("roblox-js")
exports.run = (bot, message, args) => {
    let verifiedRole = message.guild.roles.find(r => r.name === "Verified")
   if (message.member.roles.has(verifiedRole)) return message.channel.send("You are already verified.")

    function makeid() {
        var text = "";
        var selectFruit = ['oof', 'nerd', 'toaster', 'was', 'here', 'lol', 'sorta', 'script', 'idk', 'why', 'do', 'i', 'do', 'this', 'idek', 'breezy', 'bot', 'is', 'cool', 'markv', 'trooper', 'roblox',];
        text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
        text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
        text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
        text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
        return text;

    }
    const filter = m => m.author.id === message.author.id
    const collector = message.channel.createMessageCollector(filter, {
        max: "1",
        time: "200000"
    })
    const robloxEmbed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setTitle("Roblox Verify System")
        .setDescription("What's your ROBLOX username?")
        .setFooter("This prompt will cancel after 200 seconds.")
        .setTimestamp()
    message.channel.send(robloxEmbed)

    collector.on("collect", m => {
        if (m.content === 'cancel' || m.content === 'Cancel') {
            message.channel.send('**Cancelled prompt.**')
            return
        }
        rbx.getIdFromUsername(m.content).then(foundId => {
            const Id = foundId
            const newString = makeid() + makeid() + makeid() + makeid() + makeid()
            const foundUsername = new Discord.RichEmbed()
                .setColor("BLUE")
                .setTitle("Roblox Verify System")
                .setDescription("Hello **" + m.content + "**, to verify that you are that user. Please put this in your bio, or status. \n `" + newString + "`\n\nSay **done** when complete.\nSay **cancel** to cancel. ")
                .setFooter("Player ID is " + foundId)
                .setImage("https://cdn.discordapp.com/attachments/498352842818715649/515541774966587392/verify_help.png")
                .setTimestamp()
            message.channel.send(foundUsername)
            message.channel.awaitMessages(mag => {
                if (mag.content.includes('done') && mag.author.id == message.author.id) {
                    const fetchingBlurb = new Discord.RichEmbed()
                        .setColor("BLUE")
                        .setTitle("Prompt")
                        .setDescription("Fetching the code, please wait as I am going to fetch it.")
                        .setFooter("Fetching..")
                        .setTimestamp()
                    message.channel.send(fetchingBlurb)
                    setTimeout(function() {
                        rbx.getStatus(foundId).then(status => {
                            console.log(status)
                            rbx.getBlurb(foundId).then(blurb => {
                                if (status.includes(newString) || blurb.includes(newString)) {
                                    const verified = new Discord.RichEmbed()
                                        .setColor("GREEN")
                                        .setTitle("Roblox Verify System")
                                        .setDescription("You have now been verified! Please wait shortly as you are going to recieve the Verified role.")
                                        .setFooter("Verifying..")
                                        .setTimestamp()
                                    message.channel.send(verified);
                                    let role = message.guild.roles.find(r => r.name === "Member");
                                    message.member.addRole(role);
                                    console.log()
                                    message.member.setNickname(m.content);
                                    let rolew = message.guild.roles.find(r => r.name === "unverified");
                                    message.member.removeRole(rolew);
                                    console.log()
                                } else {
                                    message.channel.send("Can not find the code.");
                                }
                            })
                        }, 5000)
                    })
                } else
                if (mag.content.includes('cancel') && mag.author.id == message.author.id) {
                    message.channel.send('**Cancelled prompt.**')
                    return
                }
            })
        })
    })
}


module.exports.help = {
  
  name: "verify"
  
}
