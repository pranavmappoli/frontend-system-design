const stars = document.querySelectorAll(".star");
const ratingEl = document.querySelector(".rating");
let rating = 0;
function colorRatings(crntRating) {
  stars.forEach((star, index) => {
    if (index < crntRating) {
      star.style.backgroundColor = "yellow";
    } else {
      star.style.backgroundColor = "green";
    }
  });
}
function mouseOverHandler(e) {
  colorRatings(e.target.dataset.val);
}
function mouseLeaveHandler(e) {
  colorRatings(rating);
}
function mouseClickHandler(e) {
  rating = e.target.dataset.val;
  colorRatings(rating);
  ratingEl.innerHTML = rating;
}

stars.forEach((star) => {
  star.addEventListener("mouseover", mouseOverHandler);
  star.addEventListener("mouseleave", mouseLeaveHandler);
  star.addEventListener("click", mouseClickHandler);
});
