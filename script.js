const siteHeader = document.querySelector('.site-header');
const mobileBreakpoint = window.matchMedia('(max-width: 560px)');
const scrollThreshold = 8;
const scrollStopDelay = 180;

let lastScrollPosition = window.scrollY;
let scrollStopTimer;
let isScrollSessionActive = false;

// Satu timer dipakai untuk menandai akhir aktivitas scroll.
function scheduleScrollStop() {
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
        isScrollSessionActive = false;
    }, scrollStopDelay);
}

function updateMobileNavbar() {
    if (!siteHeader || !mobileBreakpoint.matches) {
        clearTimeout(scrollStopTimer);
        siteHeader?.classList.remove('is-hidden');
        lastScrollPosition = window.scrollY;
        isScrollSessionActive = false;
        return;
    }

    const currentScrollPosition = window.scrollY;
    const scrollDifference = currentScrollPosition - lastScrollPosition;

    scheduleScrollStop();

    if (Math.abs(scrollDifference) < scrollThreshold) {
        return;
    }

    if (!isScrollSessionActive) {
        siteHeader.classList.remove('is-hidden');
        isScrollSessionActive = true;
    } else if (currentScrollPosition <= 16 || scrollDifference < 0) {
        siteHeader.classList.remove('is-hidden');
    } else {
        siteHeader.classList.add('is-hidden');
    }

    lastScrollPosition = currentScrollPosition;
}

window.addEventListener('scroll', updateMobileNavbar, { passive: true });
window.addEventListener('resize', updateMobileNavbar);
