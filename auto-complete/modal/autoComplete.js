import { getData } from "../utils/api";
export const state = {
  searchedItems: [],
  setSearchedItems(items) {
    this.searchedItems = items;
  },
};
export async function setDataSuggetions(inp) {
  const data = await getData();
  const filteredData = data.filter((item) => item.startsWith(inp));
  state.setSearchedItems(filteredData);
}
