// Event listener for when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Select all close buttons within card elements.
    const closeButtons = document.querySelectorAll('.card .close');
    
    // Iterate through each close button and add a click event listener.
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.style.display = 'none'; // Hides the parent card element when the button is clicked.
        });
    });
});

// Function to add a new announcement.
function addAnnouncement() {
    // Retrieve user input from the form fields.
    const title = document.getElementById('announcementTitle').value;
    const date = document.getElementById('announcementDate').value;
    const time = document.getElementById('announcementTime').value;
    const content = document.getElementById('announcementContent').value;

    // Create a new div element to serve as the announcement card.
    const card = document.createElement('div');
    card.className = 'card';

    // Populate the card with HTML content, including the user's input.
    card.innerHTML = `
        <h3>${title}</h3>
        <p>${date} ${time}</p>
        <p>${content}</p>
        <button class="close" onclick="removeAnnouncement(this)">Remove</button>
    `;

    // Append the newly created card to the announcements section in the document.
    document.querySelector('.announcements').appendChild(card);

    // Clear the input form fields after the card is added.
    document.getElementById('announcementTitle').value = '';
    document.getElementById('announcementDate').value = '';
    document.getElementById('announcementTime').value = '';
    document.getElementById('announcementContent').value = '';
}

// Function to remove an announcement.
function removeAnnouncement(button) {
    // Remove the parent element of the button, effectively removing the card.
    button.parentElement.remove();
}
