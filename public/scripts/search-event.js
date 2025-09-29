// Initialize document areas
const searchForm = document.querySelector('.search-area');
const searchBar = document.getElementById('search-bar');
const cardTemplate = document.querySelector('.card-template');
const displaySearch = document.querySelector('.display-search');
const msg = document.querySelector('.err-msg');

// Listen for form submit
searchForm.addEventListener('submit', (e) => {
    const search = async () => {
        try {

            // Prevent default form submission
            e.preventDefault();

            let searchAttempt = searchBar.value.trim();

            if (searchAttempt === '') {
                displaySearch.style.display = 'none';
                return;
            }

            displaySearch.style.display = 'block';

            // Deletes the original query but keeps the template, basically starting fresh to display another search. Using psuedo class :not. Help from: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
            const cardsToRemove = displaySearch.querySelectorAll('.card:not(.card-template)');
            // Removes card from card node list
            cardsToRemove.forEach(card => card.remove());

            msg.innerHTML = '';

            const eventSearch = searchBar.value.trim();
            const words = eventSearch.split(' ');
            let formattedWords = '';
            
            // Iterates through each word from the search bar
            for (let i = 0; i < words.length; i++) {
                if (words[i].length === 0) continue;

                // Formats first letter from each word to a capital and formats every letter after the first one to a lowercase.
                const word = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
                // Checks if a word is present, uses shorthand IF or 'ternary operator' to add a space before the next word if condition is true. Help from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
                formattedWords += (formattedWords ? " " : "") + word;
            }

            // Check if there is any text within searchBar, display error message if not
            if (!eventSearch) {
                msg.style.color = 'red';
                msg.innerHTML = 'Enter an event to you would like to find...';
                return;
            }

            // Reset input searchBar
            searchBar.value = '';

            // Fetch data from DB for search res
            const response = await fetch(`http://localhost:8080/events/db/search?eventname=${encodeURIComponent(formattedWords)}`);

            // Check if there is not a 200 response
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            // Await response body to be parsed as JSON

            const data = await response.json();
            const events = data.rows;

            // Shorthand arrow function to check if eventname is the same as the entered search
            const match = events.find(event => event.eventname === formattedWords);

            // Clones the card and all of its children, reference from: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
            const card = cardTemplate.cloneNode(true);

            if (events.length > 0) {
                // Checks how many card divs are within my displaySearch area. If more than 2 (1 template and 1 search query), do not display
                if (displaySearch.querySelectorAll('.card').length < 2) {
                    card.classList.remove('card-template', 'hidden');
        
                    // Calls for db values OR uses default strings
                    card.querySelector('.event-title').textContent = match.eventname || 'Untitled Event';
                    card.querySelector('.location-text').textContent = match.location || 'Unknown location';
                    card.querySelector('.created-at').textContent = `Event created at: ${new Date(match.createdat).toLocaleDateString()}` || 'No date available'; // Referenced formatting date to string from https://www.w3schools.com/jsref/jsref_tostring_date.asp
                    card.querySelector('.event-desc').textContent = match.eventdesc || 'Description is not avaliable.';
    
                    const img = card.querySelector('.card-img');
                    img.src = match.eventimg || 'https://placehold.co/300x200/png'; // Uses a placeholder image for the meantime from: https://placehold.co/
                    img.alt = match.eventname || 'Event image';
        
                    // Adds all cards to cardContain <div>
                    displaySearch.appendChild(card);
                    
                    // Scrolls to loaded card when searched
                    card.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    
                } else {
                    console.log('Too many cards');
                    return;
                }
            } else {
                dataDiv.textContent = "No concert data";
            }

        } catch (error) {
            console.log('Error:', error);
            msg.style.color = 'red';
            msg.textContent = "Failed to load data";
        }
    }

    // Call function
    search();
});