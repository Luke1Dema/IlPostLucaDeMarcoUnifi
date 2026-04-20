/**
 * Logica per l'header appiccicoso (Sticky Header)
 * - Desktop: come prima (attivo dopo scroll)
 * - Mobile: header sempre fisso via CSS, quindi non usiamo classi "header-scrolled"
 */
const headerWrapper = document.getElementById('mainHeader');
const body = document.body;

const isMobile = () => window.matchMedia('(max-width: 991px)').matches;

const handleScrollDesktop = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
        headerWrapper.classList.add('header-scrolled');
        body.classList.add('sticky-active');
    } else if (scrollTop < 100) {
        headerWrapper.classList.remove('header-scrolled');
        body.classList.remove('sticky-active');
    }
};

const syncHeaderBehavior = () => {
    if (isMobile()) {
        // Mobile: gestione via CSS (header sempre fixed) -> pulizia classi desktop
        headerWrapper.classList.remove('header-scrolled');
        body.classList.remove('sticky-active');
        return;
    }

    // Desktop: usa comportamento originale
    handleScrollDesktop();
};

window.addEventListener('scroll', () => {
    if (!isMobile()) handleScrollDesktop();
}, { passive: true });

window.addEventListener('resize', syncHeaderBehavior, { passive: true });
syncHeaderBehavior();

document.documentElement.classList.toggle(
    'touch-device',
    navigator.maxTouchPoints && navigator.maxTouchPoints > 0
);

const syncDesktopSiteFlag = () => {
    const isTouch = navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    const vw = window.innerWidth;
    const sw = Math.min(window.screen.width, window.screen.height); // lato corto

    document.documentElement.classList.toggle('touch-device', !!isTouch);

    // euristica: in "Sito desktop" spesso vw >> sw
    const isDesktopSite = !!isTouch && (vw >= sw * 1.25);
    document.documentElement.classList.toggle('desktop-site', isDesktopSite);
};

window.addEventListener('resize', syncDesktopSiteFlag, { passive: true });
syncDesktopSiteFlag();