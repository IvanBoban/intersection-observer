// get array of all elements with class .card
const cards = document.querySelectorAll(".card");

//intersection observer class
// 2 arguments, callback and options
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // if the elements intersection observer is intersecting add show class
      entry.target.classList.toggle("show", entry.isIntersecting);
      //prevent duplication of showing
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  //options argument

  {
    threshold: 1, //threshold, how much of the element should be visible before triggering the callback function
    //rootMargin: "100px", //property how "far away " from the element does the callback fire
    //root: document.querySelector(".card-container") //root element for the observer
  }
);

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];

    if (!lastCard.isIntersecting) {
      return;
    }

    loadNewCards();
    //remove currently observed element
    lastCardObserver.unobserve(lastCard.target);
    //add new last element to continue infinite scroll
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  {
    rootMargin: "100px",
  }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach((card) => {
  observer.observe(card);
});

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New card";
    card.classList.add("card");
    observer.observe(card);
    document.querySelector(".card-container").appendChild(card);
  }
}
