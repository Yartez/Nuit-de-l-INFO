document.addEventListener('DOMContentLoaded', function () {
    const podcastSection = document.getElementById('podcast-section');
    const playButtons = document.querySelectorAll('.play-btn');
    const audioPlayer = new Audio();
    const playerPlayButton = document.getElementById('player-play');
    const playerProgress = document.getElementById('player-progress');
    const playerCurrentTime = document.getElementById('player-current-time');
    const playerDuration = document.getElementById('player-duration');
    const rewindButton = document.getElementById('player-rewind');
    const forwardButton = document.getElementById('player-forward');
    const podcastItems = document.querySelectorAll('.podcast-item');
    let currentPodcast = null;

    // Montrer la section podcast uniquement sur .home.active
    function togglePodcastSection() {
        const homeSection = document.querySelector('.home.active');
        if (homeSection) {
            podcastSection.classList.add('active');
        } else {
            podcastSection.classList.remove('active');
        }
    }

    // Mettre à jour la durée et le temps actuel
    function updatePlayerUI() {
        playerCurrentTime.textContent = formatTime(audioPlayer.currentTime);
        playerDuration.textContent = formatTime(audioPlayer.duration || 0);
        playerProgress.value = (audioPlayer.currentTime / audioPlayer.duration || 0) * 100;
    }

    // Formater le temps en mm:ss
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    // Gérer la lecture depuis la liste
    playButtons.forEach((button) => {
        button.addEventListener('click', () => {
            playButtons.forEach((btn) => {
                btn.parentElement.parentElement.classList.remove('playing');
            });
            button.parentElement.parentElement.classList.add('playing');
            const audioSrc = button.getAttribute('data-audio');
            if (audioPlayer.src !== audioSrc) {
                audioPlayer.src = audioSrc;
                audioPlayer.play();
                playerPlayButton.textContent = '⏸'; // Bouton Pause
            } else if (audioPlayer.paused) {
                audioPlayer.play();
                playerPlayButton.textContent = '⏸';
            } else {
                audioPlayer.pause();
                playerPlayButton.textContent = '▶';
            }
        });
    });

    // Gérer le lecteur
    playerPlayButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playerPlayButton.textContent = '⏸';
        } else {
            audioPlayer.pause();
            playerPlayButton.textContent = '▶';
        }
    });

    playerProgress.addEventListener('input', () => {
        audioPlayer.currentTime = (playerProgress.value / 100) * audioPlayer.duration;
    });

    rewindButton.addEventListener('click', () => {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
    });

    forwardButton.addEventListener('click', () => {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
    });

    // Mettre à jour l'UI pendant la lecture
    audioPlayer.addEventListener('timeupdate', updatePlayerUI);

    // Vérifier si la section doit être affichée
    window.addEventListener('scroll', togglePodcastSection);

    // Initialiser
    togglePodcastSection();
});
