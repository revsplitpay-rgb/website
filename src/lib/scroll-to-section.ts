/**
 * Smooth-scrolls to a section on the current page and updates the hash without
 * pushing a history entry. Targets carry `scroll-mt-24` for the fixed nav.
 */
export const scrollToSection = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
};
