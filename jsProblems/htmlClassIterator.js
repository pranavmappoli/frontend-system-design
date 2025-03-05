function getByClassNameHierarchy(root, classes) {
  const classList = classes.split(">");

  function dfs(root, index) {
    const childrens = Array.from(root.children).filter((child) =>
      child.classList.contains(classList[index])
    );
    if (index === classList.length - 1) {
      return childrens.at(-1);
    }
    if (!childrens.length) return [];
    const result = [];
    for (const child of childrens) {
      result.push(...dfs(child, index + 1));
    }
    return result;
  }
  return dfs(root, 0);
}

console.log(getByClassNameHierarchy(document.getElementById("root"), "a>b>c"));
