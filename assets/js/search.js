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
    return fetch(`${API_SLUG}/search?q=${query}`, {
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
            output += `<li class="block block-xl caps"><a class="nav-link" href="/${key}">\\ ${value.title.value}</a></li>`;
        }
        OUTPUT.innerHTML = output;
    } else {
        OUTPUT.innerHTML = `<li class="block block-xl caps">Keine Suchergebnisse für "${INPUT.value}"</li>`;
    }
};


// Eventlisteners to observe and handle search inputs
INPUT.addEventListener('input', handleSearchInput);
INPUT.addEventListener('search', handleSearchInput);
