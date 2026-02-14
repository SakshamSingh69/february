document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.start');
    const overlay = document.querySelector('.transition-overlay');

    if (startBtn && overlay) {
        const yesBtn = document.getElementById('btn-start-yes');
        const noBtn = document.getElementById('btn-start-no');

        if (yesBtn) {
            yesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = 'page2.html';
                }, 3000);
            });
        }

        if (noBtn) {
            noBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'nopage1.html';
            });
        }
    }
});
