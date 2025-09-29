const cardContainer = document.querySelector('.event-cards');
const cardTemplate = document.querySelector('.card-template');

const container = document.querySelector('.event-filters');
const form = document.getElementsByTagName('form')[0];
const options = document.getElementsByName('filters')[0];
const submit = document.querySelector('.form-button');

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
        
        // Clones the card and all of its children, reference from: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
        const card = cardTemplate.cloneNode(true);
        card.classList.remove('card-template', 'hidden');

        // Calls for db values OR uses default strings
        card.querySelector('.event-title').textContent = event.eventname || 'Untitled Event';
        card.querySelector('.location-text').textContent = event.location || 'Unknown location';
        card.querySelector('.created-at').textContent = `Event created at: ${new Date(event.createdat).toLocaleDateString()}` || 'No description available'; // Referenced formatting date to string from https://www.w3schools.com/jsref/jsref_tostring_date.asp
        card.querySelector('.event-desc').textContent = event.eventdesc || 'Description is not avaliable.';

        const img = card.querySelector('.card-img');
        img.src = event.eventimg || 'https://placehold.co/300x200/png'; // Uses a placeholder image for the meantime from: https://placehold.co/
        img.alt = event.eventname || 'Event image';

        // Adds all cards to cardContain <div>
        cardContainer.appendChild(card);
      });

    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Call function
  getData();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Gets the value from the options
    const selectedValue = options.value;

    if (!selectedValue) {
        console.log('Please select a value!');
        return;
    }

    try {

        // Fetch from mounted path
        const response = await fetch(`http://localhost:8080/events/db/filter?category=${encodeURIComponent(selectedValue)}`);

        // Check if there is not a 200 response
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const events = data.rows;

        cardContainer.innerHTML = '';

        // Iterate through each event in events table
        events.forEach(event => {
          
          // Clones the card and all of its children, reference from: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
          const card = cardTemplate.cloneNode(true);
          card.classList.remove('card-template', 'hidden');

          // Calls for db values OR uses default strings
          card.querySelector('.event-title').textContent = event.eventname || 'Untitled Event';
          card.querySelector('.location-text').textContent = event.location || 'Unknown location';
          card.querySelector('.created-at').textContent = `Event created at: ${new Date(event.createdat).toLocaleDateString()}` || 'No description available'; // Referenced formatting date to string from https://www.w3schools.com/jsref/jsref_tostring_date.asp
          card.querySelector('.event-desc').textContent = event.eventdesc || 'Description is not avaliable.';

          const img = card.querySelector('.card-img');
          img.src = event.eventimg || 'https://placehold.co/300x200/png'; // Uses a placeholder image for the meantime from: https://placehold.co/
          img.alt = event.eventname || 'Event image';

          // Adds all cards to cardContain <div>
          cardContainer.appendChild(card);
        });
        
        console.log(events);
    } catch (error) {
        console.log('Error: cannot use filters.', error);
    }
});