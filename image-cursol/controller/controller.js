const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");
const imageContainer = document.querySelector(".image-container");
let currentImage = 0;
const totalImages = document.querySelectorAll(".image-container img").length;

// setInterval(() => {
//   currentImage = (currentImage + 1) % totalImages;
//   scrollPage();
// }, 2000);

function scrollPage() {
  imageContainer.scroll({
    left: currentImage * imageContainer.offsetWidth,
    behavior: "smooth",
  });
}
nextButton.addEventListener("click", () => {
  currentImage = (currentImage + 1) % totalImages;
  scrollPage();
});
prevButton.addEventListener("click", () => {
  currentImage = (currentImage - 1 + totalImages) % totalImages;
  scrollPage();
});
