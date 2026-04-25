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
        headerWrapper.classList.remove('header-scrolled');
        body.classList.remove('sticky-active');
        return;
    }

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
    const isTouch = (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

    // In Chrome Android, quando attivi "Sito desktop" spesso sparisce "Mobile" dall'User-Agent
    const ua = navigator.userAgent || "";
    const uaLooksMobile = /Mobile/i.test(ua);

    document.documentElement.classList.toggle("touch-device", isTouch);
    document.documentElement.classList.toggle("desktop-site", isTouch && !uaLooksMobile);
};

window.addEventListener("resize", syncDesktopSiteFlag, { passive: true });
syncDesktopSiteFlag();