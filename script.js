const siteHeader = document.querySelector('.site-header');
const scrollStopDelay = 1500;
const navbarRevealZone = 24;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

let scrollStopTimer;

function showNavbar() {
    siteHeader.classList.remove('is-hidden');
}

function updateNavbarOnScroll() {
    if (!siteHeader) {
        return;
    }

    showNavbar();
    clearTimeout(scrollStopTimer);

    if (window.scrollY === 0) {
        return;
    }

    scrollStopTimer = setTimeout(() => {
        if (window.scrollY !== 0) {
            siteHeader.classList.add('is-hidden');
        }
    }, scrollStopDelay);
}

function revealNavbarNearTop(event) {
    if (
        !siteHeader
        || !finePointer.matches
        || event.pointerType !== 'mouse'
        || event.clientY > navbarRevealZone
    ) {
        return;
    }

    showNavbar();
}

window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
window.addEventListener('pointermove', revealNavbarNearTop, { passive: true });
