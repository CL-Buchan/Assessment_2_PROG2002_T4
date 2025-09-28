// Initialize document areas
const cardTemplate = document.querySelector('.card-template');
const cardContainer = document.querySelector('.card-container');

// Listen for form submit
document.addEventListener('DOMContentLoaded', () => {
    const recommendEvent = async () => {
        try {
            // Fetch data from DB for search res
            const response = await fetch('http://localhost:8080/events/db');

            // Check if there is not a 200 response
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            // Await response body to be parsed as JSON

            const data = await response.json();
            const events = data.events;

            cardContainer.style.display = 'block';

            // Deletes the original query but keeps the template, basically starting fresh to display another search. Using psuedo class :not. Help from: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
            const cardsToRemove = cardContainer.querySelectorAll('.card:not(.card-template)');
            // Removes card from card node list
            cardsToRemove.forEach(card => card.remove());

            // Gets the first event
            const event = events[0];

            // Clones the card and all of its children, reference from: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
            const card = cardTemplate.cloneNode(true);
            card.classList.remove('card-template', 'hidden');
    
            // Calls for db values OR uses default strings
            card.querySelector('.event-title').textContent = event.eventname || 'Untitled Event';
            card.querySelector('.location-text').textContent = event.location || 'Unknown location';
            card.querySelector('.created-at').textContent = `Event created at: ${new Date(event.createdat).toLocaleDateString()}` || 'No date available'; // Referenced formatting date to string from https://www.w3schools.com/jsref/jsref_tostring_date.asp
            card.querySelector('.event-desc').textContent = event.eventdesc || 'Description is not avaliable.';

            const img = card.querySelector('.card-img');
            img.src = event.eventimg || 'https://placehold.co/300x200/png'; // Uses a placeholder image for the meantime from: https://placehold.co/
            img.alt = event.eventname || 'Event image';
    
            // Adds all cards to cardContain <div>
            cardContainer.appendChild(card);
                
            // Scrolls to loaded card when searched
            card.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});

        } catch (error) {
            console.log('Error:', error);
        }
    }

    // Call function
    setTimeout(recommendEvent, 1000);
});