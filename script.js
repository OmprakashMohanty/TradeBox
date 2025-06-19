const API_URL =
  "https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20";

const userGrid = document.getElementById("user-grid");
const userDetails = document.getElementById("user-details");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

let users = [];

function createCard(user, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <p><strong>${user.name.title} ${user.name.first} ${user.name.last}</strong></p>
    <p>${user.gender}</p>
    <p class="email">${user.email}</p>
  `;
  card.addEventListener("click", () => displayDetails(index));
  return card;
}

function displayDetails(index) {
  const user = users[index];
  userDetails.classList.remove("hidden");
  userDetails.innerHTML = `
    <img src="${user.picture.large}" alt="User Photo">
    <div class="user-info">
      <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
      <p><strong>Address:</strong> ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
      <p><strong>Nationality:</strong> ${user.nat}</p>
      <p><strong>Gender:</strong> ${user.gender}</p>
      <p><strong>Email:</strong> <span class="email">${user.email}</span></p>
    </div>
  `;
}

async function fetchUsers() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    users = data.results;
    users.forEach((user, index) => {
      userGrid.appendChild(createCard(user, index));
    });
    loading.classList.add("hidden");
  } catch (err) {
    console.error("API error:", err);
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

fetchUsers();
