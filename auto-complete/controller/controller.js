import { setDataSuggetions, state } from "../modal/autoComplete";
import { renderSearchResults } from "../view/searchResults";
const inputBox = document.querySelector(".input-box");
const searchResultsContainer = document.querySelector(
  ".search-results__container"
);

inputBox.addEventListener("input", handleInputChange);

export function clearSearchResults() {
  searchResultsContainer.innerHTML = "";
  state.setSearchedItems([]);
}

function listItemClickHandler(e) {
  const val = e.target.textContent;
  inputBox.value = val;
  clearSearchResults();
}
export const setListItemEventListner = () => {
  document.querySelectorAll(".list-item")?.forEach((item) => {
    item.addEventListener("click", listItemClickHandler);
  });
};

async function handleInputChange(e) {
  const val = e.target.value;
  if (!val) return clearSearchResults();
  await setDataSuggetions(val);
  renderSearchResults(state.searchedItems);
}
