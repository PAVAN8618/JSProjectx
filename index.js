const start = document.getElementById('start_btn');
const screen = document.querySelectorAll('.screen')
const choose_insect_btns = document.querySelectorAll('.choose_insect_btn');
const game_container = document.querySelector('.game_container');
const time = document.getElementById('time')
const scorex = document.getElementById('score') 
const annoying = document.getElementById('annoying_message')

let second = 0;
let score = 0;
let selected_insect = {};

start.addEventListener('click',()=>{
    screen[0].classList.add('up')
    //console.log('add');
})

//console.log(choose_insect_btns);
choose_insect_btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        const img = btn.querySelector('img');
		const src = img.getAttribute('src');
		const alt = img.getAttribute('alt');
        selected_insect = {
			src,
			alt
		};
        screen[1].classList.add('up');
		setTimeout(createInsect, 1000);
		startGame();
    })
})

function increaseTime() {
	let m = Math.floor(second / 60);
	let s = second % 60;
	m = m < 10 ? `0${m}` : m;
	s = s < 10 ? `0${s}` : s;
	time.innerHTML = `Time: ${m}:${s}`;

	second++;
}



function addInsects() {
	setTimeout(createInsect, 1000);
	setTimeout(createInsect, 1500);
}

function createInsect() {
	const insect = document.createElement('div');
	const { x, y } = getRandomLocation();
	insect.classList.add('insect');
	insect.style.left = `${x}px`;
	insect.style.top = `${y}px`;
	insect.innerHTML = `<img src="${selected_insect.src}" arc="${
		selected_insect.alt
	}" style="transform: rotate(${Math.random() * 360}deg)"/>`;
	insect.addEventListener('click', catchInsect);

	game_container.appendChild(insect);
}

function catchInsect() {
	increaseScore();
	this.classList.add('catched');
	setTimeout(() => {
		this.remove();
	}, 2000);
	addInsects();
}

function increaseScore() {
	score++;
	if (score > 19) {
		annoying_message.classList.add('visible');
	}
	scorex.innerHTML = `Score: ${score}`;
}

function startGame() {
	setInterval(increaseTime, 1000);
}

function getRandomLocation() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const x = Math.random() * (width - 200) + 100;
	const y = Math.random() * (height - 200) + 100;

	return {
		x,
		y
	};
}
