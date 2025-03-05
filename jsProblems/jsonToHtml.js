function JSONtoHTML(json) {
  if (!json || typeof json !== "object" || !json.type) {
    throw new Error("Invalid JSON format");
  }

  const root = document.createElement(json.type);

  if (json.props) {
    Object.entries(json.props).forEach(([key, val]) => {
      root.setAttribute(key, val);
    });
  }

  if (json.children) {
    if (Array.isArray(json.children)) {
      json.children.forEach((child) => {
        root.appendChild(JSONtoHTML(child));
      });
    } else {
      root.textContent = json.children;
    }
  }

  return root;
}

const json = {
  type: "div",
  props: { id: "hello", class: "foo" },
  children: [
    { type: "h1", children: "HELLO" },
    {
      type: "p",
      children: [{ type: "span", props: { class: "bar" }, children: "World" }],
    },
  ],
};

console.log(JSONtoHTML(json));

// Output: <div id="hello" class="foo">
//   <h1>HELLO</h1>
//   <p>
//     <span class="bar">World</span>
//   </p>
// </div>;
