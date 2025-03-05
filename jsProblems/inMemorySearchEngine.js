class InMemorySearch {
  constructor() {
    this.itemMap = {};
  }

  addDocuments(itemName, ...items) {
    this.itemMap[itemName] = this.itemMap[itemName] || [];
    items.forEach((item) => {
      this.itemMap[itemName].push(item);
    });
  }
  search(itemName, filterFunction, sortCondition) {
    if (!this.itemMap[itemName]) return [];

    let results = this.itemMap[itemName].filter((item) => filterFunction(item));
    if (sortCondition) {
      const { key, asc } = sortCondition;

      function sortHandler(item1, item2) {
        if (asc) return item1[key] - item2[key];
        return item2[key] - item1[key];
      }
      return results.sort((a, b) => sortHandler(a, b));
    }
    return results;
  }
}

const searchEngine = new InMemorySearch();
searchEngine.addDocuments(
  "Movies",
  { name: "Avenger", rating: 8.5, year: 2017 },
  { name: "Black Adam", rating: 8.7, year: 2022 },
  { name: "Jhon Wick 4", rating: 8.2, year: 2023 },
  { name: "Black Panther", rating: 9.0, year: 2022 }
);
console.log(
  searchEngine.search("Movies", (e) => e.rating > 8.5, {
    key: "rating",
    asc: true,
  })
);
