const userListContainer = document.getElementById("user-list-container");
const loadMoreBtn = document.getElementById("load-more-btn");
let skip = 0;
const limit = 10;

async function fetchUsers() {
  try {
    loadMoreBtn.textContent = "Cargando más ...";
    loadMoreBtn.disabled = true;
    const response = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
    );
    const data = await response.json();
    const users = data.users;
    users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <img src="${user.image}" alt="${user.firstName}" />
        <p>${user.firstName} ${user.lastName}</p>
      `;
      userListContainer.appendChild(card);
    });
    skip += limit;
  } catch (error) {
    console.error("Error:", error);
    userListContainer.innerHTML = "<p>Something went wrong</p>";
  } finally {
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.disabled = false;
  }
}

loadMoreBtn.addEventListener("click", fetchUsers);
fetchUsers();
