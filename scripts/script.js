// Get filter buttons
const filterButtons = document.querySelectorAll(".filter-buttons button");

// Get food items
const foodItems = document.querySelectorAll(".food-item");

// Add event listener to each filter button
filterButtons.forEach((button) => {
  button.addEventListener("click", ocultItem);
});

// Set active button
function setActiveButton(e) {
  filterButtons.forEach((button) => {
    button.classList.remove("btn-clicked");
  });

  e.target.classList.add("btn-clicked");
}

// Filter items
function ocultItem(e) {
  setActiveButton(e);

  foodItems.forEach(async (item) => {
    item.classList.add("item-shrink-1");
  });

  // Hacer un settimeout para que se vea la animación
  setTimeout(() => {
    filterItem(e);
  }, 300);
}

function filterItem(e) {
  foodItems.forEach(async (item) => {
    item.classList.add("item-shrink-2");
  });

  foodItems.forEach(async (item) => {
    const itemCategory = parseInt(item.dataset.category);
    const buttonCategory = parseInt(e.target.dataset.category);

    if (buttonCategory === 0) {
      item.classList.remove("item-shrink-1");
      item.classList.remove("item-shrink-2");
      return;
    }

    if (itemCategory == buttonCategory) {
      item.classList.remove("item-shrink-1");
      item.classList.remove("item-shrink-2");
    }
  });
}

filterButtons[0].classList.add("btn-clicked");
