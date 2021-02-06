const NAV = document.getElementById('mainNav');
const NAV_TOGGLE = document.getElementById('mainNavToggle');
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
        const triggerElement = parent === NAV ? NAV_TOGGLE : e.target;
        const isExpanded = triggerElement.getAttribute('aria-expanded') === 'true';

        // Close all subnavs (only if trigger is not global NAV_TOGGLE)
        if (triggerElement !== NAV_TOGGLE) {
            for (const trigger of parent.parentNode.querySelectorAll('.nav-link')) {
                trigger.setAttribute('aria-expanded', false);
                trigger.classList.remove('active');
            }
            for (const nav of parent.parentNode.querySelectorAll(query)) {
                nav.classList.remove('expanded');
            }
        }
        // Toggle the trigger elements subnav
        if (isExpanded) {
            triggerElement.setAttribute('aria-expanded', false);
            triggerElement.classList.remove('active');
            subNav.classList.remove('expanded');
        } else {
            triggerElement.setAttribute('aria-expanded', true);
            triggerElement.classList.add('active');
            subNav.classList.add('expanded');
        }

    }
};


// Add click listeners to NAV_LINKS for routing or toggling the sub navigation
for (const navLink of NAV_LINKS) {
    navLink.addEventListener('click', handleNavInteraction);
}

// Add click listener for main NAV_TOGGLE for routing or toggling the sub navigation
NAV_TOGGLE.addEventListener('click', (e) => {
    handleNavInteraction(e, NAV);
});

// A press on the ESC Key should close the main navigation
document.addEventListener('keydown', (e) => {
    const isEscape = 'key' in e ? (e.key === 'Escape' || e.key === 'Esc') : e.keyCode === 27;
    if (isEscape) {
        NAV_TOGGLE.setAttribute('aria-expanded', false);
        NAV_TOGGLE.classList.remove('active');
        NAV.querySelector('.nav-section').classList.remove('expanded');
        NAV_TOGGLE.focus();
    }
});
