var Discord = require("discord.js");
var fs = require('fs');
var randomColour = require('randomcolor'); // yes, the creator of this package does not speak the real english
var Config = require('./config.json');
        function userPermission(member, perm) {
            if (idAdmins.includes(member.user.id)) {
                return true;
            }
            return member.hasPermission(perm);
        }
class Bot {
    constructor(){
        this.servers = require('./servers.json');
        this.discordClient = new Discord.Client({sync: true});
        const bot = new Discord.Client({ disableEveryone: true })
        this.bot.login(process.env.BOT_TOKEN);
    initialize(); {
        this.log("Connected to discord.");
        
        setInterval(() => {
            this.randomizeRoleColors();
        }, Config.randomize_delay*1000);
    }
            // pour récupérer le lien d'invitation du bot sur son serveur
            bot.on('ready', async () => {
                console.log(`Bot is ready! ${bot.user.username}`);
             
                // on tente de générer un lien d'inviotation, en cas d'erreur, on l'affiche dans la console.
                try {
                    let link = await bot.generateInvite(['ADMINISTRATOR']);
                    console.log(link);
                } catch (e) {
                    console.log(e.stack);
                }
            });
            bot.on('message', async message => {
                console.log(`Content : ${  message.content}`);
                if (message.content === prefix + "list") {
                }
    
    processMessage(message); {
        if (message.content.startsWith(`Mrainbow`)) {
            for(var role of message.mentions.roles.array()) {
                message.channel.sendMessage("Added " + role + " to list of rainbow roles.");
                
                this.addRainbowRole(message.guild.id, role.id);
            }
        }
    }
    
    randomizeRoleColors(); {
        for(var server in this.servers) {
            var liveGuild = this.discordClient.guilds.get(server);
            
            if (!liveGuild) {
                this.error("Guild with ID " + server+ " no longer exists or the bot has been removed from it.");
                continue;
            }
            
            for(var role of this.servers[server]) {
                var liveRole = liveGuild.roles.get(role);
                
                liveRole.setColor(randomColour(), "Rainbowbot random role color randomizer.");
            }
        }
    }
    
    addRainbowRole(guild, role); {
        if(this.servers[guild] == undefined) {
            this.servers[guild] = [];
        }
        
        for(var existingRole of this.servers[guild]) {
            if(existingRole == role) {
                return "That role has already been added.";
            }
        }
        
        this.servers[guild].push(role);
        this.saveServers();
    } 
    
    saveServers(); {
        fs.writeFileSync("./servers.json", JSON.stringify(this.servers), "utf8");
        this.log("Saved servers file.");
    }
    
    log(message); {
        console.log("\x1b[32mINFO\x1b[37m - \x1b[0m" + message);
    }
    
    error(message); {
        console.log("\x1b[31mERROR\x1b[37m - \x1b[0m" + message);
    }
    });
}
}
