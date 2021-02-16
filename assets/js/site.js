/**
 * This JavaScript file contains four inline modules.
 *
 * 1. Navigation Menu
 * 2. Search
 * 3. Generative Background Pattern
 * 4. Cookie Consent
 */





/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 1. NAVIGATION MENU                                          *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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





/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 2. SEARCH                                                   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const INPUT = document.getElementById('search-input');
const OUTPUT = document.getElementById('search-results');


/**
 * Queries the search API
 *
 * @param {String} query - The query to search by
 *
 * @returns {Object} - API response in JSON format
 */
const search = (query) => {
    return fetch(`${URL}/${API_SLUG}/search?q=${query}`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa(`${API_USER}:${API_PASSWORD}`),
        },
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
};


/**
 * Handles the search querying and response.
 */
const handleSearchInput = async () => {
    const query = encodeURIComponent(INPUT.value);
    // If no query, clear output
    if (query === '') {
        OUTPUT.innerHTML = '';
        return false;
    };
    // Else, fetch search results
    const response = await search(query);
    // Handle errors
    if (response.status && response.status === 'error') {
        OUTPUT.innerHTML = '';
        console.error(`${response.status}: ${response.message}`);
        return false;
    }
    // Return the data
    if (!response.results) {
        OUTPUT.innerHTML = '';
        console.warn('Search returned no error, but neither results. See the API response:', response);
        return false;
    }
    // Handle response results
    const { data } = response.results;
    if (data && data.length !== 0) {
        let output = '';
        for (const [key, value] of Object.entries(data)) {
            output += `<li class="block block-xl caps"><a class="nav-link" href="/${key}">- ${value.title.value}</a></li>`;
        }
        OUTPUT.innerHTML = output;
    } else {
        OUTPUT.innerHTML = `<li class="block block-xl caps">Keine Suchergebnisse für "${INPUT.value}"</li>`;
    }
};


// Eventlisteners to observe and handle search inputs
INPUT.addEventListener('input', handleSearchInput);
INPUT.addEventListener('search', handleSearchInput);





/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 3. GENERATIVE BACKGROUND PATTERN                            *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const BG = document.body;
const CANVAS = document.createElement('CANVAS');
const CTX = CANVAS.getContext('2d');
const PIXEL_RATIO = window.devicePixelRatio || 1;

CANVAS.width = window.innerWidth * PIXEL_RATIO;
CANVAS.height = window.innerHeight * PIXEL_RATIO;

CONFIG.startY = 500;

/**
 * Returns a random Integer between min and max.
 *
 * @param {Number} min
 * @param {Number} max
 */
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * Generates an Array of points that when connected by an interpolated line
 * form a sine wave.
 *
 * @param {HTMLElement} canvas - The canvas on which we draw everything
 * @param {Number} numberOfPoints - Number of points to return
 * @param {Number} startY - Starting y-coordinate of the first point
 * @param {Number} sineWidth - Determines width of one sine wave
 * @param {Number} sineHeight - Determines height of one sine wave
 *
 * @returns {Array} - points
 */
const getSinePoints = (canvas, numberOfPoints, startY, sineWidth, sineHeight) => {
    const points = [];
    // Add starting point to array.
    points.push([0, startY]);
    // Size of increments on x axis per point
    const stepWidth = canvas.width / numberOfPoints;
    // Generate next points on the sine wave
    for (let i = 0; i < numberOfPoints; i++) {
        // Size of increment on y axis per point
        const stepHeight = Math.sin(i * sineWidth) * sineHeight;
        // Create the next point
        points.push([
            points[points.length-1][0] + stepWidth,
            points[points.length-1][1] + stepHeight,
        ]);
    }
    return points;
}


/**
 * Returns points with randomly distorted y-values.
 *
 * @param {Array} points
 * @param {Number} interval - Max positive or negative offset added to points
 *
 * @returns {Array} - points
 */
const distortPoints = (points, interval) => {
    for (let i = 0; i < points.length; i++) {
        // Decrease max distortion probability
        const randomClampedInterval = Math.abs(randomIntFromInterval(-interval, interval));
        const distortion = randomIntFromInterval(-randomClampedInterval, randomClampedInterval);
        points[i][1] += distortion;
    }
    return points;
}


/**
 * Creates interpolations between all points on the wave line.
 *
 * Reference: https://stackoverflow.com/a/15528789
 *
 * @param {Array} points - Input points
 * @param {Number} tension - How tense the line wraps around the points
 * @param {Number} numberOfSegments - Defines the amount of interpolation between two points
 *
 * @returns {Array} - Contains interpolated points
 */
const getInterpolatedPoints = (points, tension, numberOfSegments) => {
    const result = [];
    // The algorithm requires a previous and next point to the actual points in the array.
    // Duplicate first and last point
    points.unshift(points[0]);
    points.push(points[points.length - 1]);
    // ...
    result.push(points[0]);
    // Loop trough all points without the duplicates
    for (let i = 1; i < points.length - 2; i++) {
        // Loop trough the number of segments plus one at the start and one at the end
        for (let j = 1; j <= numberOfSegments; j++) {
            // Calculate tension vectors
            const t1 = [ // next - previous * tension
                (points[i+1][0] - points[i-1][0]) * tension,
                (points[i+1][1] - points[i-1][1]) * tension,
            ];
            const t2 = [ // After next - current * tension
                (points[i+2][0] - points[i][0]) * tension,
                (points[i+2][1] - points[i][1]) * tension,
            ];
            // How far are we between the two points
            const st = j / numberOfSegments;
            // Calculate cardinals
            const c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1;
            const c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
            const c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st;
            const c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);
            // Calculate this segments point with control vectors
            const point = [
                c1 * points[i][0] + c2 * points[i+1][0] + c3 * t1[0] + c4 * t2[0],
                c1 * points[i][1] + c2 * points[i+1][1] + c3 * t1[1] + c4 * t2[1],
            ];
            // Store the calcualted point in our results array
            result.push(point);
        }
    }
    return result;
};


/**
 * Draws a line along given points on a context.
 *
 * @param {Object} context - A 2d context to draw on
 * @param {Array} points - The points along which the line runs
 */
const drawPolyLine = (context, points) => {
    // Define the starting point
    context.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i][0], points[i][1]);
    }
};


/**
 * Generates a wave line and draws it on a context.
 *
 * @param {HTMLElement} canvas - The canvas to draw on
 * @param {Object} context - The 2d context of the canvas
 * @param {Number} numberOfPoints - Number of points defining the wave line
 * @param {Number} startY - Starting y-coordinate of the first point
 * @param {Number} sineWidth - Determines width of one sine wave
 * @param {Number} sineHeight - Determines height of one sine wave
 * @param {Number} distortionInterval - Determines the max distortion of a points y coordinate
 * @param {Number} tension - How tense the line wraps around the points
 * @param {Number} numberOfSegments - Defines the amount of interpolation between two points
 * @param {Number} lineWidth - Width of the wave lines
 * @param {String} color - Color value for the wave lines
 */
const generateWave = (canvas, context, numberOfPoints, startY, sineWidth, sineHeight, distortionInterval, tension = 0.5, numberOfSegments = 16, lineWidth = 2, color = '#000') => {
    const sinePoints = getSinePoints(canvas, numberOfPoints, startY, sineWidth, sineHeight);
    const points = distortPoints(sinePoints, distortionInterval);
    // Get interpolations between the points to smooth out the wave
    const interpolatedPoints = getInterpolatedPoints(points, tension, numberOfSegments);
    context.beginPath();
    drawPolyLine(context, interpolatedPoints);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
};


/**
 * Creates a drawing of wave lines
 */
const draw = () => {
    // Clear canvas before drawing something
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    const stepSize = (CANVAS.height + 500) / CONFIG.numberOfLines;
    for (let i = 0; i < CONFIG.numberOfLines; i++) {
        CONFIG.startY = i * stepSize - 500;
        generateWave(CANVAS, CTX, CONFIG.numberOfPoints, CONFIG.startY, CONFIG.sineWidth, CONFIG.sineHeight, CONFIG.distortionInterval, CONFIG.tension, CONFIG.numberOfSegments, CONFIG.lineWidth);
    }
    // Convert the canvas content to an base64 url and apply it as background-image
    const url = CANVAS.toDataURL('image/png');
    BG.style.backgroundImage = `url(${url})`;
}


// OPTIMIZE: Reduce calculations
draw();



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 4. COOKIE CONSENT                                           *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const COOKIE_CONSENT = document.getElementById('cookieConsent');
const OPEN_COOKIE_CONSENT = document.getElementById('cookieConsentOpen');
const CLOSE_COOKIE_CONSENT = document.getElementById('cookieConsentClose');
const STATISTICS_SCRIPT_ID = 'MATOMO_STATS_SCRIPT';


/**
 * Set a cookie.
 * Creates or updates an existing one by identifier cookieName.
 *
 * @param {String} cookieName
 * @param {String} cookieValue
 * @param {Number} daysToExist
 */
const setCookie = (cookieName, cookieValue, daysToExist = 365) => {
    // Encode cookieValue in order to escape semicolons, commas, and whitespace
    const encodedCookieValue = encodeURIComponent(cookieValue);
    const expirationDate = daysToExist * 24 * 60 * 60;
    document.cookie = `${cookieName}=${encodedCookieValue};max-age=${expirationDate};path=/;SameSite=Lax;`;
};


/**
 * Get a cookie and its values
 *
 * @param {String} cookieName
 */
const getCookie = (cookieName) => {
    // Decode the cookie string, to handle cookies with special characters, e.g. '$'
    const decodedCookieString = decodeURIComponent(document.cookie);
    // Split cookie string and get all individual name=value pairs in an array
    const cookieArray = decodedCookieString.split(';');
    for (const cookieString of cookieArray) {
        const cookie = cookieString.split('=');
        // Remove whitespace at the beginning of the cookie name
        // and compare it with the given string
        if (cookieName === cookie[0].trim()) return cookie[1];
    }
    return null;
};


/**
 * Resets the browsers cookies to the COOKIE_STORE values
 */
const resetCookies = () => {
    for (const [key, cookie] of Object.entries(COOKIE_STORE)) {
        // Reset each cookie
        setCookie(cookie.name, cookie.allow);
        // And reset each cookies stored value
        cookie.value = cookie.allow;
    }
};


/**
 * Enables or disables the statistics.
 * Using Matomot for statistical tracking.
 *
 * @param {Boolean} boolean - whether the statistics should be enabled or disabled
 */
const enableStatistics = (boolean) => {
    if (boolean) {
        // const script = document.getElementById(STATISTICS_SCRIPT_ID);
        // if (!script) {
        //     let _paq = null;
        //     if (!window._paq) window._paq = [];
        //     _paq = window._paq;
        //     _paq.push(['setDocumentTitle', `${document.domain} // ${document.title}`]);
        //     _paq.push(['setDomains', ['*.klanglabor.hs-augsburg.de']]);
        //     _paq.push(["setDoNotTrack", true]);
        //     _paq.push(['trackPageView']);
        //     _paq.push(['enableLinkTracking']);
        //     _paq.push(['enableHeartBeatTimer']);
        //     (() => {
        //         const u = 'https://matomo.hs-augsburg.de/';
        //         _paq.push(['setTrackerUrl', `${u}matomo.php`]);
        //         _paq.push(['setSiteId', '2']);
        //         const d = document;
        //         const g = d.createElement('script');
        //         g.id = STATISTICS_SCRIPT_ID;
        //         const s = d.getElementsByTagName('script')[0];
        //         g.type = 'text/javascript';
        //         g.async = true;
        //         g.defer = true;
        //         g.src = `${u}matomo.js`;
        //         s.parentNode.insertBefore(g, s);
        //     })();
        // }
    } else {
        // if (window._paq) delete window._paq;
        // (() => {
        //     const script = document.getElementById(STATISTICS_SCRIPT_ID);
        //     if (script) script.remove();
        // })();
    }
};


/**
 * Initially cookie consent setup.
 * See which cookies are already set, pen the consent if needed,
 * update the store and enable statistics.
 */
const initCookieConsent = () => {
    // Check for previously defined cookie settings
    const setValues = [];
    for (const [key, cookie] of Object.entries(COOKIE_STORE)) {
        const cookieValue = getCookie(cookie.name);
        if (cookieValue) setValues.push(cookieValue);
        cookie.value = cookieValue && cookieValue !== 'false' ? true : false;
        // Initialize cookie setting input values and COOKIE_STORE
        const cookieNode = document.getElementById(cookie.nodeId);
        handleCookieChange(key)({ target: cookieNode });
    }
    // Try to enable statistics on load
    enableStatistics(COOKIE_STORE.statistics.allow && COOKIE_STORE.statistics.value);
    // Only open the cookie consent if there were no values set previously
    if (setValues.length === 0) {
        handleOpenCookieConsent();
    } else {
        // If there were some previous values, reset these cookies to
        // extend their lifetime.
        resetCookies();
    }
};


/**
 * Open the cookie consent if it isn't already opened.
 */
const handleOpenCookieConsent = () => {
    const isOpen = OPEN_COOKIE_CONSENT.getAttribute('aria-expanded') === 'true';
    if (!isOpen) {
        OPEN_COOKIE_CONSENT.setAttribute('aria-expanded', true);
        COOKIE_CONSENT.classList.add('visible');
    }
}


/**
 * Close the cookie consent and save its settings.
 */
const handleSaveCookieConsent = () => {
    const isOpen = OPEN_COOKIE_CONSENT.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
        OPEN_COOKIE_CONSENT.setAttribute('aria-expanded', false);
        COOKIE_CONSENT.classList.remove('visible');
        resetCookies();
        enableStatistics(COOKIE_STORE.statistics.allow && COOKIE_STORE.statistics.value);
    }
};


/**
 * Refreshes data in the COOKIE_STORE if an input changes.
 *
 * @param {String} key - key to the cookie stores cookie object
 *
 * @returns {Function}
 */
const handleCookieChange = (key) => (e) => {
    COOKIE_STORE[key].allow = e.target.checked;
}


// Add listeners for cookie consent events
window.addEventListener('load', initCookieConsent);

OPEN_COOKIE_CONSENT.addEventListener('click', handleOpenCookieConsent);
CLOSE_COOKIE_CONSENT.addEventListener('click', handleSaveCookieConsent);

for (const [key, cookie] of Object.entries(COOKIE_STORE)) {
    const cookieNode = document.getElementById(cookie.nodeId);
    cookieNode.addEventListener('change', handleCookieChange(key));
}
