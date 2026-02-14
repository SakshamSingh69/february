const yesBtn = document.querySelector('.yes');
const noBtn = document.querySelector('.no');

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        // Create a beautiful transition or just redirect
        // For now, direct redirect as per plan, can add transition effect later if needed
        window.location.href = 'day1_rose.html';
    });
}

if (noBtn) {
    noBtn.addEventListener('click', () => {
        window.location.href = 'nopage2.html';
    });

    // Optional: Keep the run away effect but make it clickable if they catch it? 
    // User said "if no then create an empty page", so making it clickable is safer functionality.
    // Let's remove the run away effect for now to ensure they can actually click "No" to see the page.
}