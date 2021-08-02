// const Discord = require('discord.js');

types = {
	category: '^',
	text: `#`,
	voice: '/',
	news: '$',
	nsfw: '!!'
}
function displayGuild(amount, homeSep, left) {
	let i = 0;

	bot.guilds.cache.forEach(g => {
		let guild = createElement('div', {
			onclick: () => { createChannels(g.channels.cache) }
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
		.filter((a) => "category" != a.type && !a.parentID || "category" == a.type)
		.sort((a, b) => {
			let [p, p1] = [a.position, b.position]

			return checkType(a, b, 'category') != null
				? checkType(a, b, 'category') : checkType(a, b, 'voice') != null
					? checkType(a, b, 'voice') : p - p1
		})
		.forEach(e => {
			e.type == 'category' ? category(e) : channel(e)
			e.type == 'category' && e.children.size >= 1 && e.children.sort((a, b) => {
				let [p, p1] = [a.position, b.position]
				return checkType(a, b, 'voice') != null
					? checkType(a, b, 'voice') : p - p1
			}).forEach(a => channel(a))
		})
}