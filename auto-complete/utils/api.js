import data from "./data";
export const getData = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 500);
  });
};
