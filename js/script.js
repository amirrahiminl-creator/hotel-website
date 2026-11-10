
// Reservation form

const reservationForm = document.getElementById("reservation-form");

if (reservationForm) {

    const checkIn = document.getElementById("check-in");
    const checkOut = document.getElementById("check-out");
    const reservationMessage = document.getElementById("reservation-message");

    // Get today's date in YYYY-MM-DD format
    function getToday() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    // The arrival date cannot be in the past
    checkIn.min = getToday();

    // Update the minimum departure date
    checkIn.addEventListener("change", function () {

        checkOut.min = checkIn.value;

        if (checkOut.value && checkOut.value <= checkIn.value) {
            checkOut.value = "";
        }

    });

// Handle form submission
reservationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (checkOut.value <= checkIn.value) {
        reservationMessage.textContent =
            "De vertrekdatum moet na de aankomstdatum liggen.";
        return;
    }

    // Get the selected room
    const roomSelect = document.getElementById("room-type");

    const roomName =
        roomSelect.options[roomSelect.selectedIndex].text;

    // Show reservation details
    document.getElementById("summary-room").textContent = roomName;
    document.getElementById("summary-check-in").textContent = checkIn.value;
    document.getElementById("summary-check-out").textContent = checkOut.value;
    document.getElementById("summary-guests").textContent =
        document.getElementById("guests").value;
    document.getElementById("summary-name").textContent =
        document.getElementById("guest-name").value;
    document.getElementById("summary-email").textContent =
        document.getElementById("guest-email").value;

    // Make the summary visible
    document.getElementById("reservation-summary").hidden = false;

    reservationMessage.textContent =
        "Controleer hieronder uw reserveringsgegevens.";

});

}

// Automatically select the chosen room

const roomButtons = document.querySelectorAll("[data-room]");
const roomType = document.getElementById("room-type");

roomButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedRoom = button.dataset.room;

        if (roomType) {
            roomType.value = selectedRoom;
        }

    });

});
fetch("http://localhost:5109/api/rooms")
    .then(response => response.json())
 fetch("http://localhost:5109/api/rooms")
    .then(response => response.json())
    .then(rooms => {
        const roomsContainer = document.getElementById("rooms-container");
roomsContainer.addEventListener("click", function (event) {
    const button = event.target.closest("[data-room]");

    if (!button) return;

    const roomValues = {
        "1": "standard",
        "2": "deluxe",
        "3": "suite"
    };

    const roomType = document.getElementById("room-type");

    if (roomType) {
        roomType.value = roomValues[button.dataset.room];
    }
});
        roomsContainer.innerHTML = "";

        rooms.forEach(room => {
            const roomCard = document.createElement("div");
            roomCard.classList.add("room-card");

            roomCard.innerHTML = `
    <div class="room-placeholder">
        <span>${room.name}</span>
    </div>

    <div class="room-content">
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <p>€${room.pricePerNight} per nacht</p>

        <p class="${room.isAvailable ? 'available' : 'unavailable'}">
            ${room.isAvailable ? 'Beschikbaar' : 'Niet beschikbaar'}
        </p>

        ${room.isAvailable
            ? `<a href="#reservation-form" class="btn" data-room="${room.id}">
                Reserveer deze kamer
               </a>`
            : ""}
    </div>


            `;

            roomsContainer.appendChild(roomCard);
        });
    })
    .catch(error => {
        console.error("Fout bij het ophalen van kamers:", error);
    });