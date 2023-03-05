const confettiContainer = document.querySelector('.confetti-container');

for (let i = 0; i < 100; i++) {
	const confetti = document.createElement('div');
	confetti.classList.add('confetti');
	confetti.style.left = Math.random() * 100 + '%';
	confetti.style.animationDelay = Math.random() * 5 + 's';
	confettiContainer.appendChild(confetti);
}
