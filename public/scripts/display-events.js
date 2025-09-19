const cardContainer = document.querySelector('.event-cards');
const cardTemplate = document.querySelector('.card-template');

// Listen for document content loaded
document.addEventListener('DOMContentLoaded', () => {
  const getData = async () => {
    try {
      
      // Fetch from API GET
      const response = await fetch('http://localhost:8080/events/db');
      
      // Check if there is not a 200 response
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const events = data.events;

      // Reset container
      cardContainer.innerHTML = '';

      // Iterate through each event in events table
      events.forEach(event => {
        const card = cardTemplate.cloneNode(true);
        card.classList.remove('card-template', 'hidden');

        // Calls for db values OR uses default strings
        card.querySelector('.event-title').textContent = event.eventname || 'Untitled Event';
        card.querySelector('.location-text').textContent = event.location || 'Unknown location';
        card.querySelector('.created-at').textContent = `Event created at: ${new Date(event.createdat).toLocaleDateString()}` || 'No description available'; // Referenced formatting date to string from https://www.w3schools.com/jsref/jsref_tostring_date.asp
        
        const img = card.querySelector('.card-img');
        img.src = event.imageurl || 'https://placehold.co/300x200/png'; // Uses a placeholder image for the meantime from: https://placehold.co/
        img.alt = event.eventname || 'Event image';

        // Adds all cards to cardContain <div>
        cardContainer.appendChild(card);
      });

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Call function
  getData();
});