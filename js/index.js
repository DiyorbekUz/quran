const api = 'https://api.quran.sutanlab.id/surah/'


async function renderAyats(ayatNumber){
	let response = await fetch(api + ayatNumber)
	response = await response.json();

	const surahName = response.data.name.transliteration.en;
	const numbersOfVerses = response.data.numberOfVerses;
	const verses = response.data.verses;

	heder.textContent = surahName;
	num.textContent = numbersOfVerses

	for(let vers of verses){
		const text = vers.text.arab
		const audio = vers.audio.primary  

		const li = document.createElement('li')
		li.textContent = text

		res.append(li)

		li.onclick = () =>{
			stopAllAudios()
			let audioEl = document.createElement('audio')
			audioEl.src = audio
			audioEl.play()

			document.body.append(audioEl)
		}
	}
}

async function readAllAudios(ayatNumber){
	let response = await fetch(api + ayatNumber)
	response = await response.json()

	const verses = response.data.verses;
	let index = 0

	let audioEl = document.createElement('audio')
	const audio = verses[index++].audio.primary  
	audioEl.src = audio
	audioEl.play()
	document.body.append(audioEl)

	audioEl.onended = () =>{
		if(index >= verses.length) return
		audioEl.src = verses(index++).audio.primary
		audioEl.play()
	}

}

function stopAllAudios(){
	const audios = document.querySelectorAll('audio')
	for(let audio of audios){
		audio.pause()
		audio.currentTime = 0
		audio.remove()
	}
}

search.onkeyup = event =>{
	if(!(event.keyCode == 13)) return
	
	if(event.target.value > 114 || event.target.value < 1) return
	renderAyats(event.target.value)

} 




read.onclick = ()=>{
	if(search.value > 114 || search.value < 1) return
	readAllAudios(search.value)
	renderAyats(search.value)
}