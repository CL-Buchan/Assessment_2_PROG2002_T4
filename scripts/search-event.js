// Initialize document areas
const searchForm = document.querySelector('.search-area');
const searchBar = document.getElementById('search-bar');

// Listen for form submit
searchForm.addEventListener('submit', (e) => {
    
    // Prevent default form submission
    e.preventDefault();

    const eventSearch = searchBar.value.trim();

    // Check if there is any text within searchBar
    if (!eventSearch) {
        console.log('Error: input an event to search.');
        return;
    }

    // Reset input searchBar
    searchBar.value = '';

    console.log(eventSearch);
});