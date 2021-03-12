const Discord = require('discord.js')
const ketse = new Discord.Client()
const config = require('./config.json')

ketse.on("ready", () =>{
    console.log(`${ketse.user.tag} is online and wait all commands of client`)
    ketse.user.setStatus("idle")
})


ketse.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    let role = message.member.guild.roles.cache.get(config.roleid);
    let ketseoff = message.guild.channels.cache.get(config.logs)




	if (command === 'on') {
        if(message.channel.id === config.onoffdutychannel){
        message.author.send('Now you are on!')
        const exampleembed = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setDescription("<@" + message.author.id + "> is **Online**")
        .setFooter(`ID: ${message.author.id}`)
		ketseoff.send(exampleembed);
        message.member.roles.add(role);
	}} else if (command === 'off') {
        if(message.channel.id === config.onoffdutychannel){
        message.author.send('Now you are off!')
        const remove = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setDescription(`<@${message.author.id}> is **Offline**`)        
        .setFooter(`ID: ${message.author.id}`)
		ketseoff.send(remove);
        message.member.roles.remove(role)
	}}else if(command === 'bin'){
        message.channel.send(`https://sourceb.in/`)
    }

    else if(command === 'clear'){
        if(message.member.hasPermission("ADMINISTRATOR")){
            const number = '100'
            message.channel.bulkDelete(number)
            message.channel.send(`You have delete ${number} messages`).then(message =>{
                message.delete({timeout: 1000})
            })
        }
    }
})


ketse.login(config.token)