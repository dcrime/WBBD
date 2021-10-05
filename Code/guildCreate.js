// const Discord = require('discord.js');
// const { bot } = require("./global")

types = {
	GUILD_CATEGORY: '^',
	GUILD_TEXT: `#`,
	GUILD_VOICE: '/',
	GUILD_NEWS: '$',
	nsfw: '!!'
}
statuses = {
	invisibile: 'memberStatusOffline',
	online: 'memberStatusOnline',
	idle: 'memberStatusIdle',
	dnd: 'memberStatusDnd',
}

function displayGuild(amount, homeSep, left) {
	let i = 0;

	bot.guilds.cache.forEach(g => {
		let guild = createElement('div', {
			onclick: () => {
				createChannels(g.channels.cache); globals.guild = g
				listMembers(g)
				document.getElementById('guildName').innerText = g.name
			}
		});

		guild.classList.add('guild')
		guild.style.top = `${homeSep.offsetTop + 13 + (i) * 65}px`

		let guildAcronym = createElement('div', {});
		guildAcronym.classList.add('guildAcronym')
		guildAcronym.innerText = g.nameAcronym

		guild.appendChild(guildAcronym)
		left.appendChild(guild)
		i++;
	});
}

/** @param {Discord.Collection<String, Discord.Message>} messages */
async function listMessages(messages) {
	messages = await messages
	let messageList = document.getElementById('messageList').removeChildren()
	messages.forEach(m => {
		let messageElement = createElement('div').assignClasses('messageElement').appendChildren(
			createElement('div').assignClasses('authorImg'),
			createElement('p').assignClasses('messageAuthor').setInner(m.member.displayName),
			m.content != '' ?
			createElement('p').assignClasses('message').setInner(m.content)
			: createElement('p').assignClasses('message').setInnerHTML('<strong>||||||NO CONTENTS TO BE DISPLAYED|||||||</strong>')
		)
		messageList.appendChildren(messageElement)
	})
}

/** @param {Discord.Collection<String, Discord.Channel>} channels */
function createChannels(channels) {
	let chanPlace = document.getElementById('channelPlaceholder').removeChildren()

	/** @param {Discord.CategoryChannel} cat */
	let category = (cat) => {
		let colEx = () => cat.children.size &&
			cat.children.forEach(c => document.getElementById(c.id).style.display =
				document.getElementById(c.id).style.display == 'none'
					? 'block' : 'none'
			)

		let categoryPlaceholder = createElement('div').assignClasses('categoryPlaceholder')
		let category = createElement('div', {
			onclick: () => {
				toggle.classList.toggle('categoryExpanded');
				toggle.classList.toggle('categoryExpand')
				colEx()
			}
		}).assignClasses('category')
		let toggle = createElement('div', { innerText: types[cat.type] }).assignClasses('categoryExpanded')

		category.appendChildren(
			toggle,
			createElement('div', { innerText: cat.name }).assignClasses('categoryName')
		)
		categoryPlaceholder.appendChild(category)
		chanPlace.appendChild(category)
	}
	/** @param {Discord.TextChannel} chan */
	let channel = (chan) => {
		let parent = (chan.parentID && document.getElementById(chan.parentID)) || chanPlace
		let channel = createElement('div', {
			id: chan.id,
			onclick: () => {
				document.querySelector('.selectedChan')?.classList.toggle('selectedChan')
				channel.classList.toggle('selectedChan')
				document.getElementById('channelTopName').innerText = chan.name
				globals.chan = chan
				listMessages(chan.messages.fetch())
			}
		}).assignClasses('channel')
		channel.appendChildren(
			createElement('div', { innerText: types[chan.type] }).assignClasses('channelType'),
			createElement('div', { innerText: chan.name.length > 25 ? `${chan.name.substring(0, 25)}...` : chan.name }).assignClasses('channelName')
		)
		parent.appendChild(channel)
	}

	let checkType = (a, b, type) => a.type == type && b.type !== type ? 1 : a.type !== type && b.type == type ? -1 : void 0;
	channels
		.filter((a) => (a.type != "GUILD_CATEGORY" && a.parentId == null) || a.type == "GUILD_CATEGORY")
		.sort((a, b) => {
			let [p, p1] = [a.rawPosition, b.rawPosition]

			return checkType(a, b, 'GUILD_CATEGORY') != null
				? checkType(a, b, 'GUILD_CATEGORY') : checkType(a, b, 'GUILD_VOICE') != null
					? checkType(a, b, 'GUILD_VOICE') : p - p1
		})
		.forEach(e => {
			// console.log(e.name)
			e.type == 'GUILD_CATEGORY' ? category(e) : channel(e)
			e.type == 'GUILD_CATEGORY' && e.children.size >= 1 && e.children.sort((a, b) => {
				let [p, p1] = [a.rawPosition, b.rawPosition]
				return checkType(a, b, 'GUILD_VOICE') != null
					? checkType(a, b, 'GUILD_VOICE') : p - p1
			}).forEach(a => channel(a))
		})
}

/** @param {Discord.Guild} guild */
async function listMembers(guild) {
	if (globals.intents.members) await guild.members.fetch()
	let parent = document.getElementById('memberList')

	let tmpRoles = []
	let members = guild.members.cache.sort((a, b) =>
	(
		a.roles.hoist && !tmpRoles.includes(a.roles.hoist.id) && tmpRoles.push(a.roles.hoist.id),
		a.displayName.localeCompare(b.displayName))
	)
	let roles = guild.roles.cache.filter(role => tmpRoles.includes(role.id)).sort((a, b) => b.position - a.position)

	parent.removeChildren()

	roles.forEach(role => {
		console.log(role.name)
		parent.appendChildren(createElement('p', { innerText: role.name, id: role.id })).assignClasses('memberRole')
	})

	// let role = createElement('div', {
	// 	id: role.id,
	// 	onclick: () => { }
	// }).assignClasses('memberRole')
	members.forEach(
		(member) => {
			let memberDiv = createElement('div', {
				id: member.id,
				onclick: () => { }
			}).assignClasses('member')
			let name = createElement('div', { innerText: member.displayName }).assignClasses('memberNick')
			name.style.color = member.roles.hoist?.hexColor || '#b9bbbe'
			memberDiv.appendChildren(
				createElement('div').assignClasses('memberImg').appendChildren(createElement('div').assignClasses(statuses[member.presence?.status] || 'invisible')),
				name
			)

			document.getElementById(member.roles.hoist?.id)
				? document.getElementById(member.roles.hoist.id).appendChild(memberDiv)
				: parent.appendChild(memberDiv)



		}
	)
	// parent.appendChild(member)
}