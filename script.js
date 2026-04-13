document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sections = document.querySelectorAll('section');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const btnOpenInvite = document.getElementById('btn-open-invite');
    const guestCountEl = document.getElementById('guest-count');
    const successPopup = document.getElementById('success-popup');
    const noPopup = document.getElementById('no-popup');

    let currentGuestCount = 1;

    // 1. Loading Screen Logic
    setTimeout(() => {
        switchSection('opening-invite');
    }, 2500);

    // 2. Section Navigation
    function switchSection(sectionId) {
        sections.forEach(s => s.classList.remove('active'));
        const next = document.getElementById(sectionId);
        if (next) {
            next.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // 3. Music Control Logic
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().catch(e => console.log("Autoplay blocked", e));
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    musicBtn.addEventListener('click', toggleMusic);

    btnOpenInvite.addEventListener('click', () => {
        switchSection('invitation-letter');
        // Initial play and unmute
        bgMusic.muted = false;
        bgMusic.play();
        musicBtn.classList.add('playing');
        isPlaying = true;
    });

    // 4. Countdown Timer Logic
    const targetDate = new Date('May 12, 2026 16:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff < 0) {
            document.getElementById('countdown').innerHTML = "The celebration has begun!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 5. RSVP Flow
    window.showGuestCount = () => {
        switchSection('guest-count-section');
    };

    window.handleNoAttend = () => {
        noPopup.classList.add('show');
    };

    window.closeNoPopup = () => {
        noPopup.classList.remove('show');
    };

    window.updateCount = (val) => {
        currentGuestCount += val;
        if (currentGuestCount < 1) currentGuestCount = 1;
        if (currentGuestCount > 10) currentGuestCount = 10;
        
        // Simple scale animation on number change
        guestCountEl.style.transform = 'scale(1.2)';
        setTimeout(() => guestCountEl.style.transform = 'scale(1)', 100);
        
        guestCountEl.innerText = currentGuestCount;
    };

    window.submitRSVP = () => {
        successPopup.classList.add('show');
    };

    window.goToConfirmation = () => {
        successPopup.classList.remove('show');
        switchSection('confirmation-page');
    };
});
