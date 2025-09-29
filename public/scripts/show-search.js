async function loadConcerts() {
    const dataDiv = document.getElementById('data');

    try {
        const response = await fetch("http://localhost:8080/events/db/search?eventid=9");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const events = data.rows;

        // Checks if there is any data avaliable
        if (events.length > 0) {

            // Iterates through table rows
            events.forEach(event => {
                const newText = document.createElement("p");
                newText.textContent = `${event.category}: ${event.eventname}, Location: ${event.location}`;
                dataDiv.appendChild(newText);
            });

        } else {
            dataDiv.textContent = "No concert data";
        }
    } catch (error) {
        console.error("Error fetching data", error);
        dataDiv.textContent = "Failed to load data";
    }
}

loadConcerts();
