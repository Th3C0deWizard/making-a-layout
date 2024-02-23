// Menú JS

// Get filter buttons and food items
const filterButtons = document.querySelectorAll(".filter-buttons button");
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

// Blog carousel
const blogCarousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper button");
const firstCardWidth = document.querySelector(".card").offsetWidth + 29;

let isDragging = false,
  startX,
  startScrollLeft;

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    blogCarousel.scrollLeft +=
      btn.id === "btn-left" ? -1 * firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  blogCarousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = blogCarousel.scrollLeft;
};

const dragging = (e) => {
  if (isDragging)
    blogCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const draggStop = () => {
  isDragging = false;
  blogCarousel.classList.remove("dragging");
};

blogCarousel.addEventListener("mousedown", dragStart);
blogCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", draggStop);

// Review carousel
const reviewCarousel = document.querySelector(".carousel-review");
const cardReviewWidth = document.querySelector(
  ".carousel-review > div"
).offsetWidth;
const btnReview = document.querySelectorAll(".point");

reviewCarousel.scrollLeft = cardReviewWidth;
btnReview[1].classList.add("btn-point-selected");

btnReview.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    reviewCarousel.scrollLeft = cardReviewWidth * index;
    cardReviewSelected = index;
    btnReview.forEach((button) => {
      button.classList.remove("btn-point-selected");
    });
    btn.classList.add("btn-point-selected");
  });
});

let isDraggingReview = false,
  startXReview,
  startScrollLeftReview;

const dragStartReview = (e) => {
  isDraggingReview = true;
  reviewCarousel.classList.add("dragging");
  startXReview = e.pageX;
  startScrollLeftReview = reviewCarousel.scrollLeft;
};

const draggingReview = (e) => {
  if (isDraggingReview) {
    reviewCarousel.scrollLeft =
      startScrollLeftReview - (e.pageX - startXReview);
  }
};

const draggStopReview = () => {
  isDraggingReview = false;
  reviewCarousel.classList.remove("dragging");
  btnReview.forEach((button) => {
    button.classList.remove("btn-point-selected");
  });
  if (
    reviewCarousel.scrollLeft >= 0 &&
    reviewCarousel.scrollLeft < cardReviewWidth
  ) {
    btnReview[0].classList.add("btn-point-selected");
  } else if (
    reviewCarousel.scrollLeft >= cardReviewWidth &&
    reviewCarousel.scrollLeft < cardReviewWidth * 2
  ) {
    btnReview[1].classList.add("btn-point-selected");
  } else {
    btnReview[2].classList.add("btn-point-selected");
  }
};

reviewCarousel.addEventListener("mousedown", dragStartReview);
reviewCarousel.addEventListener("mousemove", draggingReview);
document.addEventListener("mouseup", draggStopReview);
