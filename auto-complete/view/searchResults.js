import { setListItemEventListner } from "../controller/controller";
const searchResultsContainer = document.querySelector(
  ".search-results__container"
);
export function renderSearchResults(data) {
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const el = document.createElement("li");
    el.innerHTML = item;
    fragment.appendChild(el);
    el.classList.add("list-item");
  });
  searchResultsContainer.innerHTML = "";
  searchResultsContainer.appendChild(fragment);
  setListItemEventListner();
}
