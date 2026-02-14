document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('trackSlider');
    const slides = document.querySelectorAll('.track-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = playPauseBtn.querySelector('i');

    let currentIndex = 0;
    let isPlaying = false;
    let currentAudio = document.getElementById(`audio-${currentIndex}`);

    function updateSlider() {
        // Slide effect
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active class for scaling effect
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Handle Audio
        // Pause all audio and reset progress
        document.querySelectorAll('audio').forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });

        // Update current track
        currentAudio = document.getElementById(`audio-${currentIndex}`);

        // If it was playing, play the new one from start
        if (isPlaying) {
            currentAudio.play();
        }
    }

    function togglePlay() {
        if (isPlaying) {
            currentAudio.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        } else {
            currentAudio.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    playPauseBtn.addEventListener('click', togglePlay);

    // --- Coupon Slider Logic ---
    const couponSlides = document.querySelectorAll('.coupon-slide');
    const prevCouponBtn = document.getElementById('prevCouponBtn');
    const nextCouponBtn = document.getElementById('nextCouponBtn');
    let currentCouponIndex = 0;

    function updateCouponSlider() {
        couponSlides.forEach((slide, index) => {
            if (index === currentCouponIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    nextCouponBtn.addEventListener('click', () => {
        currentCouponIndex = (currentCouponIndex + 1) % couponSlides.length;
        updateCouponSlider();
    });

    prevCouponBtn.addEventListener('click', () => {
        currentCouponIndex = (currentCouponIndex - 1 + couponSlides.length) % couponSlides.length;
        updateCouponSlider();
    });

    // --- Music Track Bar Logic ---
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    slides.forEach((slide, index) => {
        const audio = slide.querySelector('audio');
        const seekSlider = slide.querySelector('.seek-slider');
        const currentTimeLabel = slide.querySelector('.current-time');
        const totalDurationLabel = slide.querySelector('.total-duration');

        if (!audio || !seekSlider) return;

        function updateDuration() {
            if (audio.duration && !isNaN(audio.duration)) {
                seekSlider.max = Math.floor(audio.duration);
                totalDurationLabel.textContent = formatTime(audio.duration);
            }
        }

        // Update total duration when metadata is loaded or duration changes
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('durationchange', updateDuration);

        // Update progress bar and time labels as song plays
        audio.addEventListener('timeupdate', () => {
            // Also update duration if it wasn't set yet (fallback)
            if (seekSlider.max == 100 && audio.duration) {
                updateDuration();
            }

            if (!seekSlider.dragging) {
                seekSlider.value = Math.floor(audio.currentTime);
                currentTimeLabel.textContent = formatTime(audio.currentTime);
            }
        });

        // Seek through audio when slider is moved
        seekSlider.addEventListener('input', () => {
            seekSlider.dragging = true;
            currentTimeLabel.textContent = formatTime(seekSlider.value);
        });

        seekSlider.addEventListener('change', () => {
            audio.currentTime = seekSlider.value;
            seekSlider.dragging = false;
        });
    });

    // --- Falling Hearts/Roses on Flip ---
    const shayariCards = document.querySelectorAll('.shayari-flip-card');

    shayariCards.forEach(card => {
        let isAnimating = false;

        card.addEventListener('mouseenter', () => {
            if (isAnimating) return;
            isAnimating = true;

            // Get card position
            const rect = card.getBoundingClientRect();
            const count = 50; // Increased number of elements

            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const el = document.createElement('div');
                    el.classList.add('falling-element');
                    el.textContent = Math.random() > 0.5 ? '🌹' : '❤️';

                    // Random horizontal position within card width
                    const randomX = Math.random() * rect.width;

                    el.style.left = (rect.left + randomX) + 'px';
                    el.style.top = (rect.top - 20) + 'px';

                    // Random fall duration and size
                    el.style.animationDuration = (2 + Math.random() * 3) + 's'; // Slower fall (2-5s)
                    el.style.fontSize = (1 + Math.random()) + 'rem';

                    document.body.appendChild(el);

                    // Cleanup
                    el.addEventListener('animationend', () => {
                        el.remove();
                    });
                }, i * 200); // Stagger creation over 10s (50 * 200ms = 10000ms)
            }

            // Reset flag after animation burst
            setTimeout(() => {
                isAnimating = false;
            }, 11000); // 11s to be safe
        });
    });
});
