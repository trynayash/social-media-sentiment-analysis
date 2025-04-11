function launchConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = ''; // Clear previous confetti
    
    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random styling
        const size = Math.random() * 10 + 5;
        const colors = [
            getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
            getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
            getComputedStyle(document.documentElement).getPropertyValue('--positive-color'),
            '#FFD700', // Gold
            '#FF69B4', // Hot Pink
        ];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `-${size}px`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Animation
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        confetti.style.animation = `fall ${duration}s ease-in ${delay}s forwards`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation completes
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}