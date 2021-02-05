const NAV = document.getElementById('mainNav');
const NAV_TOGGLE = document.getElementById('mainNavToggle');
const NAV_SECTIONS = document.getElementsByClassName('nav-section');
const NAV_LINKS = document.getElementsByClassName('nav-link');


/**
 * Handles toggling a subnavigation or routing.
 *
 * @param {Event} e - Interaction event data
 * @param {HTMLElement} parent - Element in which to search for the sub navigation
 * @param {String} query - Query to find a sub navigation
 */
const handleNavInteraction = (e, parent = e.target.parentNode, query = '.nav-section') => {
    const subNav = parent.querySelector(query);
    if (subNav) {
        // If there is a sub-navigation prevent the routing and toggle it
        e.preventDefault();
        const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
        e.target.setAttribute('aria-expanded', !isExpanded);
        if (parent === NAV) parent = NAV_TOGGLE;
        parent.classList.toggle('active');
        subNav.classList.toggle('expanded');
    }
};


// Add click listeners to NAV_LINKS for routing or toggling the sub navigation
for (const navLink of NAV_LINKS) {
    navLink.addEventListener('click', handleNavInteraction);
}

NAV_TOGGLE.addEventListener('click', (e) => {
    handleNavInteraction(e, NAV);
});
