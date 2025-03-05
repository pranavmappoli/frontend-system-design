const str = "Hello, world";
const styleArr = [
  [0, 2, "i"],
  [4, 9, "b"],
  [7, 10, "u"],
];

function parse(styleArr, str) {
  const modifiedArr = [...str];
  for (const [start, end, tag] of styleArr) {
    modifiedArr[start] = `<${tag}>${modifiedArr[start]}`;
    modifiedArr[end] = `${modifiedArr[end]}</${tag}>`;
  }
  const parsedStr = modifiedArr.join("");
  return new DOMParser().parseFromString(parsedStr, "text/html").body.innerHTML;
}

const str2 = "Hello, World";
const style = [
  [0, 2, "i"],
  [1, 3, "b"],
];

parse(style, str2);
