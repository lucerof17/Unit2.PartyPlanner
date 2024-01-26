// Function to add a new party to the list
function addParty() {
  const name = document.getElementById('partyName').value;
  const date = document.getElementById('partyDate').value;
  const time = document.getElementById('partyTime').value;
  const location = document.getElementById('partyLocation').value;
  const description = document.getElementById('partyDescription').value;

  if (name && date && time && location && description) {
    // Create a new list item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${name}</strong> - ${date}, ${time}<br>
      Location: ${location}<br>
      Description: ${description}
      <span class="deleteButton" onclick="deleteParty(this)">Delete</span>
    `;

    // Add the new party to the list
    document.getElementById('partyList').appendChild(listItem);

    // Clear the form fields
    document.getElementById('partyForm').reset();
  } else {
    alert('Please fill out all fields');
  }
}

// Function to delete a party from the list
function deleteParty(button) {
  const listItem = button.parentNode;
  const partyList = listItem.parentNode;
  partyList.removeChild(listItem);
}

// Function to fetch events from the API and render them on the page
async function fetchAndRenderEvents() {
  const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {
      const events = data.data;
      renderEvents(events);
    } else {
      console.error('Error fetching events:', data.error.message);
    }
  } catch (error) {
    console.error('Error fetching events:', error.message);
  }
}

// Function to render events on the page
function renderEvents(events) {
  const eventList = document.getElementById('eventList');
  eventList.innerHTML = ''; // Clear existing list

  events.forEach(event => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${event.name}</strong> - ${event.date}<br>
      Location: ${event.location}<br>
      Description: ${event.description}
    `;
    eventList.appendChild(listItem);
  });
}

// Call the function to fetch and render events when the page loads
window.onload = fetchAndRenderEvents;
